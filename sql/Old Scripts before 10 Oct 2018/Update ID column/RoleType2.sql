/*
   Friday, June 8, 20184:34:38 PM
   User: sa
   Server: AHMEDSH-LAP
   Database: Tameenk
   Application: 
*/

/* To prevent any potential data loss issues, you should review this script in detail before running it outside the context of the database designer.*/
BEGIN TRANSACTION
SET QUOTED_IDENTIFIER ON
SET ARITHABORT ON
SET NUMERIC_ROUNDABORT OFF
SET CONCAT_NULL_YIELDS_NULL ON
SET ANSI_NULLS ON
SET ANSI_PADDING ON
SET ANSI_WARNINGS ON
COMMIT
BEGIN TRANSACTION
GO
CREATE TABLE dbo.Tmp_RoleType
	(
	Id int NOT NULL,
	Guid uniqueidentifier NULL,
	TypeNameAR nvarchar(50) NOT NULL,
	TypeNameEN nvarchar(50) NOT NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_RoleType SET (LOCK_ESCALATION = TABLE)
GO
IF EXISTS(SELECT * FROM dbo.RoleType)
	 EXEC('INSERT INTO dbo.Tmp_RoleType (Id, Guid, TypeNameAR, TypeNameEN)
		SELECT CONVERT(int, Id), Guid, TypeNameAR, TypeNameEN FROM dbo.RoleType WITH (HOLDLOCK TABLOCKX)')
GO
COMMIT
