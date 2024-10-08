-- CreateTable
CREATE TABLE "Info" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "moneyUnit" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Response" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "infoId" INTEGER NOT NULL,
    CONSTRAINT "Response_infoId_fkey" FOREIGN KEY ("infoId") REFERENCES "Info" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Step" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "moneyCost" REAL NOT NULL,
    "timeCost" REAL NOT NULL,
    "responseId" INTEGER NOT NULL,
    CONSTRAINT "Step_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Response" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Completion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" BOOLEAN NOT NULL,
    "stepId" INTEGER NOT NULL,
    CONSTRAINT "Completion_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Response_infoId_key" ON "Response"("infoId");
