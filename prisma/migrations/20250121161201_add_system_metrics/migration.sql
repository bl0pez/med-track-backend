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
