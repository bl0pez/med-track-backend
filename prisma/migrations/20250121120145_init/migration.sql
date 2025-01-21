/*
  Warnings:

  - You are about to drop the column `RequestType` on the `Tank` table. All the data in the column will be lost.
  - You are about to drop the column `externalId` on the `Tank` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `Tank` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `Tank` table. All the data in the column will be lost.
  - Added the required column `request_type` to the `Tank` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tank" DROP CONSTRAINT "Tank_externalId_fkey";

-- DropForeignKey
ALTER TABLE "Tank" DROP CONSTRAINT "Tank_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Tank" DROP CONSTRAINT "Tank_serviceId_fkey";

-- DropIndex
DROP INDEX "externalId";

-- DropIndex
DROP INDEX "patientId";

-- DropIndex
DROP INDEX "serviceId";

-- AlterTable
ALTER TABLE "Tank" DROP COLUMN "RequestType",
DROP COLUMN "externalId",
DROP COLUMN "patientId",
DROP COLUMN "serviceId",
ADD COLUMN     "external_id" INTEGER,
ADD COLUMN     "patient_id" INTEGER,
ADD COLUMN     "request_type" "RequestType" NOT NULL,
ADD COLUMN     "service_id" INTEGER;

-- CreateIndex
CREATE INDEX "patient_id" ON "Tank"("patient_id");

-- CreateIndex
CREATE INDEX "service_id" ON "Tank"("service_id");

-- CreateIndex
CREATE INDEX "external_id" ON "Tank"("external_id");

-- AddForeignKey
ALTER TABLE "Tank" ADD CONSTRAINT "Tank_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tank" ADD CONSTRAINT "Tank_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tank" ADD CONSTRAINT "Tank_external_id_fkey" FOREIGN KEY ("external_id") REFERENCES "External"("id") ON DELETE SET NULL ON UPDATE CASCADE;
