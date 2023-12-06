-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('service', 'booking', 'review', 'message');

-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "type" "NotificationType" NOT NULL DEFAULT 'service';
