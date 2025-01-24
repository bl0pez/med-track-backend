-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "PatientStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "TankCapacity" AS ENUM ('THREE_M3', 'SIX_M3', 'TEN_M3');

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
    "roles" "Role"[] DEFAULT ARRAY['USER']::"Role"[],

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
    "request_type" "RequestType" NOT NULL,
    "capacity" "TankCapacity" NOT NULL,
    "status" "TankStatus" NOT NULL,
    "patient_id" INTEGER,
    "service_id" INTEGER,
    "external_id" INTEGER,
    "delivered_by_id" INTEGER,
    "received_by_id" INTEGER,
    "deliveredAt" TIMESTAMP(3) NOT NULL,
    "returnedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemMetrics" (
    "id" SERIAL NOT NULL,
    "total_patients_active" INTEGER NOT NULL DEFAULT 0,
    "total_patients_inactive" INTEGER NOT NULL DEFAULT 0,
    "total_tanks_delivered" INTEGER NOT NULL DEFAULT 0,
    "total_tanks_returned" INTEGER NOT NULL DEFAULT 0,
    "total_tanks_recharge" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "patient_id" ON "Tank"("patient_id");

-- CreateIndex
CREATE INDEX "service_id" ON "Tank"("service_id");

-- CreateIndex
CREATE INDEX "external_id" ON "Tank"("external_id");

-- CreateIndex
CREATE INDEX "number_tank" ON "Tank"("number_tank");

-- CreateIndex
CREATE INDEX "status_index" ON "Tank"("status");

-- CreateIndex
CREATE INDEX "returnedAt_index" ON "Tank"("returnedAt");

-- CreateIndex
CREATE INDEX "status_id_index" ON "Tank"("status", "id");

-- AddForeignKey
ALTER TABLE "Tank" ADD CONSTRAINT "Tank_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tank" ADD CONSTRAINT "Tank_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tank" ADD CONSTRAINT "Tank_external_id_fkey" FOREIGN KEY ("external_id") REFERENCES "External"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tank" ADD CONSTRAINT "Tank_delivered_by_id_fkey" FOREIGN KEY ("delivered_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tank" ADD CONSTRAINT "Tank_received_by_id_fkey" FOREIGN KEY ("received_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
