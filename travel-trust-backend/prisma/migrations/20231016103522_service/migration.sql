/*
  Warnings:

  - Added the required column `location` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SERVICE_CATEGORY" AS ENUM ('Any', 'Tours', 'Flights', 'Hotels', 'Cruises', 'Car_Rentals', 'Travel_Insurance', 'Visa_Services', 'Adventure_Travel', 'Honeymoon_Packages', 'Group_Travel', 'Custom_Packages');

-- CreateEnum
CREATE TYPE "SERVICE_STATUS" AS ENUM ('open', 'on_hold', 'cancel');

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "category" "SERVICE_CATEGORY" NOT NULL DEFAULT 'Any',
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "status" "SERVICE_STATUS" NOT NULL DEFAULT 'open';
