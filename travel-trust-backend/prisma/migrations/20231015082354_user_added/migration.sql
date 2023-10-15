-- CreateEnum
CREATE TYPE "ENUM_USER_ROLE" AS ENUM ('user', 'admin', 'super_admin');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "role" "ENUM_USER_ROLE" NOT NULL DEFAULT 'user',
    "gender" TEXT,
    "age" INTEGER,
    "address" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
