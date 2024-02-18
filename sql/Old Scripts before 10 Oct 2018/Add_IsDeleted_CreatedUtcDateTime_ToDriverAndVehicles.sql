USE Tameenk

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE Table_Name = 'Vehicles' AND Column_name = 'CreatedUtcDateTime')
BEGIN
	ALTER TABLE Vehicles ADD CreatedUtcDateTime DATETIME NULL
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE Table_Name = 'Driver' AND Column_name = 'IsDeleted')
BEGIN
	ALTER TABLE Driver
	ADD IsDeleted BIT NOT NULL
	CONSTRAINT DF_Driver_IsDeleted DEFAULT 0
	WITH VALUES
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE Table_Name = 'Driver' AND Column_name = 'CreatedUtcDateTime')
BEGIN
	ALTER TABLE Driver ADD CreatedUtcDateTime DATETIME NULL
END
