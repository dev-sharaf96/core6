EXEC sp_rename 'Vehicles', 'Vehicle'
GO;
/*
   Friday, June 8, 20182:47:06 PM
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
ALTER TABLE dbo.CheckoutDetails
	DROP CONSTRAINT FK_CheckoutDetails_ProductType
GO
ALTER TABLE dbo.ProductType SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.ProductType', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.ProductType', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.ProductType', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.CheckoutDetails
	DROP CONSTRAINT FK_CheckoutDetails_Product
GO
ALTER TABLE dbo.Product SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.Product', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.Product', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.Product', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.CheckoutDetails
	DROP CONSTRAINT FK_CheckoutDetails_PolicyStatus
GO
ALTER TABLE dbo.PolicyStatus SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.PolicyStatus', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.PolicyStatus', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.PolicyStatus', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.CheckoutDetails
	DROP CONSTRAINT FK_CheckoutDetails_PaymentMethod
GO
ALTER TABLE dbo.PaymentMethod SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.PaymentMethod', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.PaymentMethod', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.PaymentMethod', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.CheckoutDetails
	DROP CONSTRAINT FK_CheckoutDetails_CheckoutCarBackImage
GO
ALTER TABLE dbo.CheckoutDetails
	DROP CONSTRAINT FK_CheckoutDetails_CheckoutCarBodyImage
GO
ALTER TABLE dbo.CheckoutDetails
	DROP CONSTRAINT FK_CheckoutDetails_CheckoutCarFrontImage
GO
ALTER TABLE dbo.CheckoutDetails
	DROP CONSTRAINT FK_CheckoutDetails_CheckoutCarLeftImage
GO
ALTER TABLE dbo.CheckoutDetails
	DROP CONSTRAINT FK_CheckoutDetails_CheckoutCarRightImage
GO
ALTER TABLE dbo.CheckoutCarImages SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.CheckoutCarImages', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.CheckoutCarImages', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.CheckoutCarImages', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.Vehicle
	DROP CONSTRAINT FK_Vehicles_VehiclePlateType
GO
ALTER TABLE dbo.VehiclePlateType SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.VehiclePlateType', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.VehiclePlateType', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.VehiclePlateType', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.Vehicle
	DROP CONSTRAINT FK_Vehicles_VehicleBody
GO
ALTER TABLE dbo.VehicleBodyType SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.VehicleBodyType', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.VehicleBodyType', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.VehicleBodyType', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.QuotationRequest
	DROP CONSTRAINT FK_QuotationRequest_City
GO
ALTER TABLE dbo.City SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.City', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.City', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.City', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.CheckoutDetails
	DROP CONSTRAINT FK_CheckoutDetails_User
GO
ALTER TABLE dbo.QuotationRequest
	DROP CONSTRAINT FK_QuotationRequest_AspNetUsers
GO
ALTER TABLE dbo.AspNetUsers SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.AspNetUsers', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.AspNetUsers', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.AspNetUsers', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.QuotationRequest
	DROP CONSTRAINT FK_QuotationRequest_Driver
GO
ALTER TABLE dbo.CheckoutDetails
	DROP CONSTRAINT FK_CheckoutDetails_MainDriver
GO
ALTER TABLE dbo.Driver SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.Driver', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.Driver', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.Driver', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.Vehicle
	DROP CONSTRAINT DF_Vehicles_IsDeleted
GO
CREATE TABLE dbo.Tmp_Vehicle
	(
	ID nvarchar(100) NOT NULL,
	GUID uniqueidentifier NULL,
	SequenceNumber nvarchar(30) NULL,
	CustomCardNumber nvarchar(30) NULL,
	IsRegistered bit NOT NULL,
	Cylinders tinyint NULL,
	LicenseExpiryDate nvarchar(20) NULL,
	MajorColor nvarchar(20) NULL,
	MinorColor nvarchar(20) NULL,
	ModelYear smallint NULL,
	PlateTypeCode tinyint NOT NULL,
	RegisterationPlace nvarchar(20) NULL,
	VehicleBodyCode tinyint NOT NULL,
	VehicleWeight int NOT NULL,
	VehicleLoad int NOT NULL,
	VehicleMaker nvarchar(50) NULL,
	VehicleModel nvarchar(30) NOT NULL,
	ChassisNumber nvarchar(30) NULL,
	VehicleMakerCode smallint NULL,
	VehicleModelCode bigint NULL,
	IsDeleted bit NOT NULL,
	CarPlateText1 nvarchar(1) NULL,
	CarPlateText2 nvarchar(1) NULL,
	CarPlateText3 nvarchar(1) NULL,
	CarPlateNumber smallint NULL,
	CarOwnerNIN nvarchar(MAX) NULL,
	CarOwnerName nvarchar(MAX) NULL,
	VehicleValue int NULL,
	IsUsedCommercially bit NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_Vehicle SET (LOCK_ESCALATION = TABLE)
GO
ALTER TABLE dbo.Tmp_Vehicle ADD CONSTRAINT
	DF_Vehicles_IsDeleted DEFAULT ((0)) FOR IsDeleted
GO
IF EXISTS(SELECT * FROM dbo.Vehicle)
	 EXEC('INSERT INTO dbo.Tmp_Vehicle (ID, SequenceNumber, CustomCardNumber, IsRegistered, Cylinders, LicenseExpiryDate, MajorColor, MinorColor, ModelYear, PlateTypeCode, RegisterationPlace, VehicleBodyCode, VehicleWeight, VehicleLoad, VehicleMaker, VehicleModel, ChassisNumber, VehicleMakerCode, VehicleModelCode, IsDeleted, CarPlateText1, CarPlateText2, CarPlateText3, CarPlateNumber, CarOwnerNIN, CarOwnerName, VehicleValue, IsUsedCommercially)
		SELECT CONVERT(nvarchar(100), ID), SequenceNumber, CustomCardNumber, IsRegistered, Cylinders, LicenseExpiryDate, MajorColor, MinorColor, ModelYear, PlateTypeCode, RegisterationPlace, VehicleBodyCode, VehicleWeight, VehicleLoad, VehicleMaker, VehicleModel, ChassisNumber, VehicleMakerCode, VehicleModelCode, IsDeleted, CarPlateText1, CarPlateText2, CarPlateText3, CarPlateNumber, CarOwnerNIN, CarOwnerName, VehicleValue, IsUsedCommercially FROM dbo.Vehicle WITH (HOLDLOCK TABLOCKX)')
GO
ALTER TABLE dbo.QuotationRequest
	DROP CONSTRAINT FK_QuotationRequest_Vehicles
GO
ALTER TABLE dbo.CheckoutDetails
	DROP CONSTRAINT FK_CheckoutDetails_Vehicle
GO
DROP TABLE dbo.Vehicle
GO
EXECUTE sp_rename N'dbo.Tmp_Vehicle', N'Vehicle', 'OBJECT' 
GO
ALTER TABLE dbo.Vehicle ADD CONSTRAINT
	PK_Vehicles PRIMARY KEY CLUSTERED 
	(
	ID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.Vehicle ADD CONSTRAINT
	FK_Vehicles_VehicleBody FOREIGN KEY
	(
	VehicleBodyCode
	) REFERENCES dbo.VehicleBodyType
	(
	Code
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.Vehicle ADD CONSTRAINT
	FK_Vehicles_VehiclePlateType FOREIGN KEY
	(
	PlateTypeCode
	) REFERENCES dbo.VehiclePlateType
	(
	Code
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
COMMIT
select Has_Perms_By_Name(N'dbo.Vehicle', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.Vehicle', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.Vehicle', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
CREATE TABLE dbo.Tmp_CheckoutDetails
	(
	ReferenceId nvarchar(50) NOT NULL,
	Email nvarchar(50) NULL,
	Phone nvarchar(50) NULL,
	BankCode nvarchar(50) NULL,
	IBAN nvarchar(50) NULL,
	PaymentMethodCode tinyint NULL,
	ImageRightId int NULL,
	ImageLeftId int NULL,
	ImageFrontId int NULL,
	ImageBackId int NULL,
	ImageBodyId int NULL,
	UserId nvarchar(128) NOT NULL,
	VehicleId nvarchar(100) NOT NULL,
	MainDriverId uniqueidentifier NULL,
	PolicyStatusId int NULL,
	CreatedDateTimeUtc datetime NULL,
	SelectedProductId uniqueidentifier NULL,
	SelectedInsuranceTypeCode smallint NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_CheckoutDetails SET (LOCK_ESCALATION = TABLE)
GO
IF EXISTS(SELECT * FROM dbo.CheckoutDetails)
	 EXEC('INSERT INTO dbo.Tmp_CheckoutDetails (ReferenceId, Email, Phone, BankCode, IBAN, PaymentMethodCode, ImageRightId, ImageLeftId, ImageFrontId, ImageBackId, ImageBodyId, UserId, VehicleId, MainDriverId, PolicyStatusId, CreatedDateTimeUtc, SelectedProductId, SelectedInsuranceTypeCode)
		SELECT ReferenceId, Email, Phone, BankCode, IBAN, PaymentMethodCode, ImageRightId, ImageLeftId, ImageFrontId, ImageBackId, ImageBodyId, UserId, CONVERT(nvarchar(100), VehicleId), MainDriverId, PolicyStatusId, CreatedDateTimeUtc, SelectedProductId, SelectedInsuranceTypeCode FROM dbo.CheckoutDetails WITH (HOLDLOCK TABLOCKX)')
GO
ALTER TABLE dbo.CheckoutAdditionalDrivers
	DROP CONSTRAINT FK_CheckOutAdditionalDrivers_CheckoutDetails
GO
ALTER TABLE dbo.PayfortPaymentRequest
	DROP CONSTRAINT FK_PayfortPaymentRequest_CheckoutDetails
GO
ALTER TABLE dbo.Policy
	DROP CONSTRAINT FK_Policy_CheckOutDetails
GO
DROP TABLE dbo.CheckoutDetails
GO
EXECUTE sp_rename N'dbo.Tmp_CheckoutDetails', N'CheckoutDetails', 'OBJECT' 
GO
ALTER TABLE dbo.CheckoutDetails ADD CONSTRAINT
	PK_CheckoutDetails PRIMARY KEY CLUSTERED 
	(
	ReferenceId
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.CheckoutDetails ADD CONSTRAINT
	FK_CheckoutDetails_CheckoutCarBackImage FOREIGN KEY
	(
	ImageBackId
	) REFERENCES dbo.CheckoutCarImages
	(
	ID
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.CheckoutDetails ADD CONSTRAINT
	FK_CheckoutDetails_CheckoutCarBodyImage FOREIGN KEY
	(
	ImageBodyId
	) REFERENCES dbo.CheckoutCarImages
	(
	ID
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.CheckoutDetails ADD CONSTRAINT
	FK_CheckoutDetails_CheckoutCarFrontImage FOREIGN KEY
	(
	ImageFrontId
	) REFERENCES dbo.CheckoutCarImages
	(
	ID
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.CheckoutDetails ADD CONSTRAINT
	FK_CheckoutDetails_CheckoutCarLeftImage FOREIGN KEY
	(
	ImageLeftId
	) REFERENCES dbo.CheckoutCarImages
	(
	ID
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.CheckoutDetails ADD CONSTRAINT
	FK_CheckoutDetails_CheckoutCarRightImage FOREIGN KEY
	(
	ImageRightId
	) REFERENCES dbo.CheckoutCarImages
	(
	ID
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.CheckoutDetails ADD CONSTRAINT
	FK_CheckoutDetails_MainDriver FOREIGN KEY
	(
	MainDriverId
	) REFERENCES dbo.Driver
	(
	DriverId
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.CheckoutDetails ADD CONSTRAINT
	FK_CheckoutDetails_PaymentMethod FOREIGN KEY
	(
	PaymentMethodCode
	) REFERENCES dbo.PaymentMethod
	(
	Code
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.CheckoutDetails ADD CONSTRAINT
	FK_CheckoutDetails_PolicyStatus FOREIGN KEY
	(
	PolicyStatusId
	) REFERENCES dbo.PolicyStatus
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.CheckoutDetails ADD CONSTRAINT
	FK_CheckoutDetails_Product FOREIGN KEY
	(
	SelectedProductId
	) REFERENCES dbo.Product
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.CheckoutDetails ADD CONSTRAINT
	FK_CheckoutDetails_ProductType FOREIGN KEY
	(
	SelectedInsuranceTypeCode
	) REFERENCES dbo.ProductType
	(
	Code
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.CheckoutDetails ADD CONSTRAINT
	FK_CheckoutDetails_User FOREIGN KEY
	(
	UserId
	) REFERENCES dbo.AspNetUsers
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.CheckoutDetails ADD CONSTRAINT
	FK_CheckoutDetails_Vehicle FOREIGN KEY
	(
	VehicleId
	) REFERENCES dbo.Vehicle
	(
	ID
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
COMMIT
select Has_Perms_By_Name(N'dbo.CheckoutDetails', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.CheckoutDetails', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.CheckoutDetails', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.Policy ADD CONSTRAINT
	FK_Policy_CheckOutDetails FOREIGN KEY
	(
	CheckOutDetailsId
	) REFERENCES dbo.CheckoutDetails
	(
	ReferenceId
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.Policy SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.Policy', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.Policy', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.Policy', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.PayfortPaymentRequest ADD CONSTRAINT
	FK_PayfortPaymentRequest_CheckoutDetails FOREIGN KEY
	(
	CheckoutDetailsId
	) REFERENCES dbo.CheckoutDetails
	(
	ReferenceId
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.PayfortPaymentRequest SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.PayfortPaymentRequest', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.PayfortPaymentRequest', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.PayfortPaymentRequest', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.CheckoutAdditionalDrivers ADD CONSTRAINT
	FK_CheckOutAdditionalDrivers_CheckoutDetails FOREIGN KEY
	(
	CheckoutDetailsId
	) REFERENCES dbo.CheckoutDetails
	(
	ReferenceId
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.CheckoutAdditionalDrivers SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.CheckoutAdditionalDrivers', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.CheckoutAdditionalDrivers', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.CheckoutAdditionalDrivers', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.QuotationRequest
	DROP CONSTRAINT DF_QuotationRequest_IsComprehensiveGenerated
GO
ALTER TABLE dbo.QuotationRequest
	DROP CONSTRAINT DF_QuotationRequest_IsComprehensiveRequested
GO
CREATE TABLE dbo.Tmp_QuotationRequest
	(
	ID int NOT NULL IDENTITY (1, 1),
	ExternalId nvarchar(50) NOT NULL,
	MainDriverId uniqueidentifier NOT NULL,
	CityCode bigint NOT NULL,
	RequestPolicyEffectiveDate datetime NULL,
	VehicleId nvarchar(100) NOT NULL,
	UserId nvarchar(128) NULL,
	NajmNcdRefrence nvarchar(128) NULL,
	NajmNcdFreeYears int NULL,
	CreatedDateTimeUtc datetime NOT NULL,
	IsComprehensiveGenerated bit NOT NULL,
	IsComprehensiveRequested bit NOT NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_QuotationRequest SET (LOCK_ESCALATION = TABLE)
GO
ALTER TABLE dbo.Tmp_QuotationRequest ADD CONSTRAINT
	DF_QuotationRequest_IsComprehensiveGenerated DEFAULT ((0)) FOR IsComprehensiveGenerated
GO
ALTER TABLE dbo.Tmp_QuotationRequest ADD CONSTRAINT
	DF_QuotationRequest_IsComprehensiveRequested DEFAULT ((0)) FOR IsComprehensiveRequested
GO
SET IDENTITY_INSERT dbo.Tmp_QuotationRequest ON
GO
IF EXISTS(SELECT * FROM dbo.QuotationRequest)
	 EXEC('INSERT INTO dbo.Tmp_QuotationRequest (ID, ExternalId, MainDriverId, CityCode, RequestPolicyEffectiveDate, VehicleId, UserId, NajmNcdRefrence, NajmNcdFreeYears, CreatedDateTimeUtc, IsComprehensiveGenerated, IsComprehensiveRequested)
		SELECT ID, ExternalId, MainDriverId, CityCode, RequestPolicyEffectiveDate, CONVERT(nvarchar(100), VehicleId), UserId, NajmNcdRefrence, NajmNcdFreeYears, CreatedDateTimeUtc, IsComprehensiveGenerated, IsComprehensiveRequested FROM dbo.QuotationRequest WITH (HOLDLOCK TABLOCKX)')
GO
SET IDENTITY_INSERT dbo.Tmp_QuotationRequest OFF
GO
ALTER TABLE dbo.QuotationRequestAdditionalDrivers
	DROP CONSTRAINT FK_QuotationRequestAdditionalDrivers_QuotationRequest
GO
ALTER TABLE dbo.QuotationResponse
	DROP CONSTRAINT FK_QuotationResponse_QuotationRequest
GO
DROP TABLE dbo.QuotationRequest
GO
EXECUTE sp_rename N'dbo.Tmp_QuotationRequest', N'QuotationRequest', 'OBJECT' 
GO
ALTER TABLE dbo.QuotationRequest ADD CONSTRAINT
	PK_QuotationRequest PRIMARY KEY CLUSTERED 
	(
	ID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
CREATE UNIQUE NONCLUSTERED INDEX IX_QuotationRequest_Index ON dbo.QuotationRequest
	(
	ExternalId
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE dbo.QuotationRequest ADD CONSTRAINT
	FK_QuotationRequest_Driver FOREIGN KEY
	(
	MainDriverId
	) REFERENCES dbo.Driver
	(
	DriverId
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.QuotationRequest ADD CONSTRAINT
	FK_QuotationRequest_Vehicles FOREIGN KEY
	(
	VehicleId
	) REFERENCES dbo.Vehicle
	(
	ID
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.QuotationRequest ADD CONSTRAINT
	FK_QuotationRequest_AspNetUsers FOREIGN KEY
	(
	UserId
	) REFERENCES dbo.AspNetUsers
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.QuotationRequest ADD CONSTRAINT
	FK_QuotationRequest_City FOREIGN KEY
	(
	CityCode
	) REFERENCES dbo.City
	(
	Code
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
COMMIT
select Has_Perms_By_Name(N'dbo.QuotationRequest', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.QuotationRequest', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.QuotationRequest', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.QuotationResponse ADD CONSTRAINT
	FK_QuotationResponse_QuotationRequest FOREIGN KEY
	(
	RequestId
	) REFERENCES dbo.QuotationRequest
	(
	ID
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.QuotationResponse SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.QuotationResponse', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.QuotationResponse', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.QuotationResponse', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.QuotationRequestAdditionalDrivers ADD CONSTRAINT
	FK_QuotationRequestAdditionalDrivers_QuotationRequest FOREIGN KEY
	(
	QuotationRequestId
	) REFERENCES dbo.QuotationRequest
	(
	ID
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.QuotationRequestAdditionalDrivers SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.QuotationRequestAdditionalDrivers', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.QuotationRequestAdditionalDrivers', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.QuotationRequestAdditionalDrivers', 'Object', 'CONTROL') as Contr_Per 