USE Tameenk

IF NOT EXISTS (
	SELECT	*
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_NAME = 'Vehicles'
	)
BEGIN
	CREATE TABLE [dbo].[Vehicles](
		[ID] UNIQUEIDENTIFIER NOT NULL,
		[SequenceNumber] NVARCHAR(30) NULL,
		[CustomCardNumber] NVARCHAR(30) NULL,
		IsRegistered BIT NOT NULL,
		Cylinders TINYINT NULL,
		LicenseExpiryDate DATETIME NULL,
		MajorColor NVARCHAR(20) NULL,
		MinorColor NVARCHAR(20) NULL,
		ModelYear TINYINT NULL,
		PlateTypeCode TINYINT NOT NULL,
		RegisterationPlace NVARCHAR(20) NULL,
		VehicleBodyCode TINYINT NOT NULL,
		VehicleWeight INT NOT NULL,
		VehicleLoad INT NOT NULL,
		VehicleMaker NVARCHAR(50),
		VehicleModel NVARCHAR(5),
		ChassisNumber NVARCHAR(30)
		CONSTRAINT [PK_Vehicles] PRIMARY KEY CLUSTERED 
		(
			[ID] ASC
		)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY]
END
GO


IF NOT EXISTS (
	SELECT	*
	FROM	INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
	WHERE	CONSTRAINT_NAME = 'FK_Vehicles_VehiclePlateType' 
		AND TABLE_NAME = 'Vehicles' 
		AND COLUMN_NAME = 'VehiclePlateType')
BEGIN
	ALTER TABLE [dbo].[Vehicles]  WITH CHECK 
	ADD  CONSTRAINT [FK_Vehicles_VehiclePlateType] FOREIGN KEY([PlateTypeCode])
	REFERENCES [dbo].[VehiclePlateType] ([Code])

	ALTER TABLE [dbo].[Vehicles] CHECK CONSTRAINT [FK_Vehicles_VehiclePlateType]
END
GO

IF NOT EXISTS (
	SELECT	*
	FROM	INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
	WHERE	CONSTRAINT_NAME = 'FK_Vehicles_VehicleBody' 
		AND TABLE_NAME = 'Vehicles' 
		AND COLUMN_NAME = 'VehicleBodyType')
BEGIN
	ALTER TABLE [dbo].[Vehicles]  WITH CHECK 
	ADD  CONSTRAINT [FK_Vehicles_VehicleBody] FOREIGN KEY([VehicleBodyCode])
	REFERENCES [dbo].[VehicleBodyType] ([Code])

	ALTER TABLE [dbo].[Vehicles] CHECK CONSTRAINT [FK_Vehicles_VehicleBody]
END
GO

IF NOT EXISTS (
	SELECT	*
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_NAME = 'CheckoutDetails' 
		AND COLUMN_NAME = 'VehicleId')
BEGIN
	ALTER TABLE CheckoutDetails ADD VehicleId UNIQUEIDENTIFIER NOT NULL
END
GO

IF NOT EXISTS (
	SELECT	*
	FROM	INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
	WHERE	CONSTRAINT_NAME = 'FK_CheckoutDetails_Vehicle' 
		AND TABLE_NAME = 'CheckoutDetails' 
		AND COLUMN_NAME = 'Vehicles')
BEGIN
	ALTER TABLE [dbo].[CheckoutDetails]  WITH CHECK 
	ADD  CONSTRAINT [FK_CheckoutDetails_Vehicle] FOREIGN KEY([VehicleId])
	REFERENCES [dbo].[Vehicles] ([ID])

	ALTER TABLE [dbo].[CheckoutDetails] CHECK CONSTRAINT [FK_CheckoutDetails_Vehicle]
END
GO

IF NOT EXISTS (
	SELECT	*
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_NAME = 'Vehicles' 
		AND COLUMN_NAME = 'VehicleMakerCode')
BEGIN
	ALTER TABLE Vehicles ADD VehicleMakerCode TINYINT NOT NULL
END
GO

IF NOT EXISTS (
	SELECT	*
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_NAME = 'Vehicles' 
		AND COLUMN_NAME = 'VehicleModelCode')
BEGIN
	ALTER TABLE Vehicles ADD VehicleModelCode TINYINT NOT NULL
END
GO

ALTER TABLE Vehicles
ALTER COLUMN [LicenseExpiryDate] nvarchar(20);
ALTER TABLE Vehicles
ALTER COLUMN [ModelYear] smallint;
ALTER TABLE Vehicles
ALTER COLUMN VehicleMakerCode smallint;
ALTER TABLE Vehicles
ALTER COLUMN VehicleModelCode bigint;
