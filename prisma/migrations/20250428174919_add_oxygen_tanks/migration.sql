-- CreateEnum
CREATE TYPE "TankStatus" AS ENUM ('DELIVERED', 'RETURNED');

-- CreateEnum
CREATE TYPE "TankSize" AS ENUM ('SIX_M3', 'TEN_M3');

-- CreateTable
CREATE TABLE "OxygenTank" (
    "id" SERIAL NOT NULL,
    "size" "TankSize" NOT NULL,
    "status" "TankStatus" NOT NULL,
    "deliveredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnedAt" TIMESTAMP(3),
    "patientId" INTEGER NOT NULL,
    "deliveredById" INTEGER NOT NULL,
    "receivedById" INTEGER,

    CONSTRAINT "OxygenTank_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OxygenTank" ADD CONSTRAINT "OxygenTank_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OxygenTank" ADD CONSTRAINT "OxygenTank_deliveredById_fkey" FOREIGN KEY ("deliveredById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OxygenTank" ADD CONSTRAINT "OxygenTank_receivedById_fkey" FOREIGN KEY ("receivedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
