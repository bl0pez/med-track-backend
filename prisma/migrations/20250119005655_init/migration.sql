-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "PatientStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "TankCapacity" AS ENUM ('SIX_M2', 'TEN_M2', 'THREE_M3');

-- CreateEnum
CREATE TYPE "TankStatus" AS ENUM ('DELIVERED', 'RETURNED', 'RECHARGE');

-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('PATIENT', 'SERVICE', 'EXTERNAL');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roles" "Role"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "status" "PatientStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "External" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "External_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tank" (
    "id" SERIAL NOT NULL,
    "number_tank" TEXT NOT NULL,
    "RequestType" "RequestType" NOT NULL,
    "capacity" "TankCapacity" NOT NULL,
    "status" "TankStatus" NOT NULL,
    "patientId" INTEGER,
    "serviceId" INTEGER,
    "externalId" INTEGER,
    "deliveredAt" TIMESTAMP(3) NOT NULL,
    "returnedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tank_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "patientId" ON "Tank"("patientId");

-- CreateIndex
CREATE INDEX "serviceId" ON "Tank"("serviceId");

-- CreateIndex
CREATE INDEX "externalId" ON "Tank"("externalId");

-- CreateIndex
CREATE INDEX "number_tank" ON "Tank"("number_tank");

-- AddForeignKey
ALTER TABLE "Tank" ADD CONSTRAINT "Tank_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tank" ADD CONSTRAINT "Tank_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tank" ADD CONSTRAINT "Tank_externalId_fkey" FOREIGN KEY ("externalId") REFERENCES "External"("id") ON DELETE SET NULL ON UPDATE CASCADE;
