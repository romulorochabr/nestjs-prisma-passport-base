/*
  Warnings:

  - You are about to drop the column `celular` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cnpj` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tel_fixo` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpfCnpj]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpfCnpj` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_cnpj_key";

-- DropIndex
DROP INDEX "User_cpf_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "celular",
DROP COLUMN "cnpj",
DROP COLUMN "cpf",
DROP COLUMN "tel_fixo",
ADD COLUMN     "cpfCnpj" VARCHAR(20) NOT NULL,
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "landline" VARCHAR(20),
ADD COLUMN     "mobile" VARCHAR(20);

-- CreateIndex
CREATE UNIQUE INDEX "User_cpfCnpj_key" ON "User"("cpfCnpj");
