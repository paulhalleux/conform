BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[preferences] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [theme] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [preferences_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL CONSTRAINT [preferences_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [preferences_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [preferences_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- AddForeignKey
ALTER TABLE [dbo].[preferences] ADD CONSTRAINT [preferences_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
