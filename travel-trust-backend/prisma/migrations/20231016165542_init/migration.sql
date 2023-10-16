/*
  Warnings:

  - The values [open,on_hold] on the enum `SERVICE_STATUS` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SERVICE_STATUS_new" AS ENUM ('available', 'upcoming', 'cancel');
ALTER TABLE "services" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "services" ALTER COLUMN "status" TYPE "SERVICE_STATUS_new" USING ("status"::text::"SERVICE_STATUS_new");
ALTER TYPE "SERVICE_STATUS" RENAME TO "SERVICE_STATUS_old";
ALTER TYPE "SERVICE_STATUS_new" RENAME TO "SERVICE_STATUS";
DROP TYPE "SERVICE_STATUS_old";
ALTER TABLE "services" ALTER COLUMN "status" SET DEFAULT 'available';
COMMIT;

-- AlterTable
ALTER TABLE "services" ALTER COLUMN "status" SET DEFAULT 'available';
