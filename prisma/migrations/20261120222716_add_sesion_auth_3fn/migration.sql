-- CreateTable
CREATE TABLE "SesionAuth" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" TIMESTAMP(3),

    CONSTRAINT "SesionAuth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SesionAuth_tokenHash_key" ON "SesionAuth"("tokenHash");

-- CreateIndex
CREATE INDEX "SesionAuth_usuarioId_idx" ON "SesionAuth"("usuarioId");

-- AddForeignKey
ALTER TABLE "SesionAuth" ADD CONSTRAINT "SesionAuth_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
