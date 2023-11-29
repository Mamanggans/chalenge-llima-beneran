-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_source_account_id_fkey" FOREIGN KEY ("source_account_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
