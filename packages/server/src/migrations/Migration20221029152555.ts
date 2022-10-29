import { Migration } from "@mikro-orm/migrations";

export class Migration20221029152555 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "channel_id" varchar(255) not null);'
    );
    this.addSql(
      'alter table "user" add constraint "user_email_unique" unique ("email");'
    );
    this.addSql(
      'alter table "user" add constraint "user_channel_id_unique" unique ("channel_id");'
    );
  }
}
