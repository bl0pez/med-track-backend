-- CreateEnum
CREATE TYPE "CylinderCapacity" AS ENUM ('SIX_M3', 'THREE_M3', 'TEN_M3');

-- CreateEnum
CREATE TYPE "CylinderStatus" AS ENUM ('IN_STOCK', 'DELIVERED', 'RETURNED');

-- CreateEnum
CREATE TYPE "TransactionAction" AS ENUM ('DELIVERY', 'RETURN', 'RECHARGE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'OPERATOR', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "PatientStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "TankCapacity" AS ENUM ('THREE_M3', 'SIX_M3', 'TEN_M3');

-- CreateEnum
CREATE TYPE "TankStatus" AS ENUM ('DELIVERED', 'RETURNED', 'RECHARGE');

-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('PATIENT', 'SERVICE', 'EXTERNAL');

-- CreateTable
CREATE TABLE "Metrics" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cylindersInStock" INTEGER NOT NULL DEFAULT 0,
    "cylindersDelivered" INTEGER NOT NULL DEFAULT 0,
    "cylindersReturned" INTEGER NOT NULL DEFAULT 0,
    "deliveriesCount" INTEGER NOT NULL DEFAULT 0,
    "returnsCount" INTEGER NOT NULL DEFAULT 0,
    "rechargesCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Metrics_pkey" PRIMARY KEY ("id")
);

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
    "status" "PatientStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdBy" INTEGER NOT NULL,
    "closedBy" INTEGER,
    "closedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "closedBy" INTEGER,
    "closedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "External" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "closedBy" INTEGER,
    "closedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "External_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Samu" (
    "id" SERIAL NOT NULL,
    "ambulanceNumber" TEXT NOT NULL,
    "rechargeDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "closedBy" INTEGER,
    "closedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Samu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cylinder" (
    "id" SERIAL NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "capacity" "CylinderCapacity" NOT NULL,
    "status" "CylinderStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cylinder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CylinderTransaction" (
    "id" SERIAL NOT NULL,
    "cylinderId" INTEGER NOT NULL,
    "deliveredBy" INTEGER NOT NULL,
    "receivedBy" INTEGER,
    "patientId" INTEGER,
    "serviceId" INTEGER,
    "externalId" INTEGER,
    "samuId" INTEGER,
    "action" "TransactionAction" NOT NULL,
    "deliveredAt" TIMESTAMP(3) NOT NULL,
    "returnedAt" TIMESTAMP(3),
    "performedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CylinderTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_rut_key" ON "Patient"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "Cylinder_serialNumber_key" ON "Cylinder"("serialNumber");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_closedBy_fkey" FOREIGN KEY ("closedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_closedBy_fkey" FOREIGN KEY ("closedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "External" ADD CONSTRAINT "External_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "External" ADD CONSTRAINT "External_closedBy_fkey" FOREIGN KEY ("closedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Samu" ADD CONSTRAINT "Samu_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Samu" ADD CONSTRAINT "Samu_closedBy_fkey" FOREIGN KEY ("closedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CylinderTransaction" ADD CONSTRAINT "CylinderTransaction_cylinderId_fkey" FOREIGN KEY ("cylinderId") REFERENCES "Cylinder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CylinderTransaction" ADD CONSTRAINT "CylinderTransaction_deliveredBy_fkey" FOREIGN KEY ("deliveredBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CylinderTransaction" ADD CONSTRAINT "CylinderTransaction_receivedBy_fkey" FOREIGN KEY ("receivedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CylinderTransaction" ADD CONSTRAINT "CylinderTransaction_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CylinderTransaction" ADD CONSTRAINT "CylinderTransaction_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CylinderTransaction" ADD CONSTRAINT "CylinderTransaction_externalId_fkey" FOREIGN KEY ("externalId") REFERENCES "External"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CylinderTransaction" ADD CONSTRAINT "CylinderTransaction_samuId_fkey" FOREIGN KEY ("samuId") REFERENCES "Samu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
