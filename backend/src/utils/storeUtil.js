import { Pool } from "pg";
import { sprintf } from "sprintf-js";
import ms from "ms";

class PgStore {
  constructor(connection, options) {
    //super();
    this.storage = {};
    this.pool = new Pool(connection);
    this.query = (query, params) => {
      return this.pool.query(query, params);
    };
    this.ready = false;
    this.options = { ...PgStore.defaultOpts, ...options };
  }

  static get defaultOpts() {
    return {
      schema: "public",
      table: "session",
      create: true, //Create a new session table by default
      cleanupTime: ms("45 minutes")
    };
  }

  setUp() {
    //Only setup if we're not ready
    if (this.ready) return;

    //If we need to create the tables, return a promise that resolves once the query completes
    //Otherwise just setup the cleanup and return an empty promise
    let promise = this.options.create
      ? this.query(this.createSql)
      : Promise.resolve();

    //Once we've finished creation, schedule cleanup and tell everyone we're ready
    return promise.then(() => {
      this.scheduleCleanup();
      this.ready = true;
    });
  }

  /**
   * Get the raw SQL for creating a new session table
   */

  get createSql() {
    return sprintf(
      "CREATE SCHEMA IF NOT EXISTS %s;\n" +
      "CREATE TABLE IF NOT EXISTS %s.%s (\n" +
      "   id TEXT NOT NULL PRIMARY KEY,\n" + //This is the Koa session ID
      "   expiry timestamp NOT NULL,\n" + //This is the timestamp of when it will expire
      "   session JSON\n" + //All the session data that has been saved
        ");",
      this.options.schema,
      this.options.schema,
      this.options.table
    );
  }

  /**
   * Get the raw SQL for getting an existing session
   */
  get getValueSql() {
    return sprintf(
      "SELECT session FROM %s.%s WHERE id = $1",
      this.options.schema,
      this.options.table
    );
  }

  /**
   * Get the raw SQL for updating an existing session
   */
  get updateValueSql() {
    return sprintf(
      "UPDATE %s.%s SET session = $1, expiry = to_timestamp($2) WHERE id = $3;",
      this.options.schema,
      this.options.table
    );
  }

  /**
   * Get the raw SQL for creating a new existing session
   */
  get insertValueSql() {
    return sprintf(
      "INSERT INTO %s.%s(id, session, expiry) VALUES($1, $2, to_timestamp($3) );",
      this.options.schema,
      this.options.table
    );
  }

  /**
   * Get the raw SQL for destroying an existing session
   */
  get destroyValueSql() {
    return sprintf(
      "DELETE FROM %s.%s WHERE id = $1",
      this.options.schema,
      this.options.table
    );
  }

  /**
   * Get the raw SQL for cleaning up expired sessions
   */
  get cleanupSql() {
    return sprintf(
      "DELETE FROM %s.%s WHERE expiry <= to_timestamp($1);",
      this.options.schema,
      this.options.table
    );
  }

  async get(key, maxAge, { rolling }) {
    console.log('运行到此？')
    if (!this.ready)
      throw new Error(
        `Error trying to access koa postgres session: session setup has not been run.`
      );

    //Get the existing session row
    const existing = await this.query(this.getValueSql, [key]);

    //If there is no such row, return false
    if (existing.length <= 0) return false;
    //Otherwise return the row
    else return existing[0].session;
  }

  async set(key, sess, maxAge, { rolling, changed }) {
    if (!this.ready)
      throw new Error(
        `Error trying to modify koa postgres session: session setup has not been run.`
      );

    const ttl = maxAge || ms("45 minutes");
    const expiry = (Date.now() + ttl) / 1000;

    //If there is a row, update it
    if (await this.get(key))
      await this.query(this.updateValueSql, [sess, expiry, key]);
    //Otherwise, insert a new row
    //(These two queries intentionally have a different parameter order because of the SQL structure)
    else await this.query(this.insertValueSql, [key, sess, expiry]);
  }

  async destroy(key) {
    await this.query(this.destroyValueSql, [key]);
  }

  /**
   * Setup cleanup of all sessions in the session table that have expired
   */
  scheduleCleanup() {
    let sess = this;

    //Each interval of cleanupTime, run the cleanup script
    setTimeout(function interval() {
      sess.query(sess.cleanupSql, Date.now() / 1000).then(() => {
        //Recurse so that the cleanupTime can be dynamic
        setTimeout(interval, sess.options.cleanupTime);
      });
    }, sess.options.cleanupTime);
  }
}
export default PgStore;
