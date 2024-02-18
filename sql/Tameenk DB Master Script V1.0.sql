
/****** Object:  Table [dbo].[__MigrationHistory]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__MigrationHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ContextKey] [nvarchar](300) NOT NULL,
	[Model] [varbinary](max) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK_dbo.__MigrationHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC,
	[ContextKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AdditionalInfo]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AdditionalInfo](
	[ReferenceId] [nvarchar](50) NOT NULL,
	[InfoAsJsonString] [nvarchar](max) NULL,
	[DriverAdditionalInfo] [nvarchar](4000) NULL,
 CONSTRAINT [PK__Addition__E1A99A191B4A44D6] PRIMARY KEY CLUSTERED 
(
	[ReferenceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Address]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Address](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](max) NULL,
	[Address1] [nvarchar](500) NULL,
	[Address2] [nvarchar](500) NULL,
	[ObjLatLng] [nvarchar](500) NULL,
	[BuildingNumber] [nvarchar](500) NULL,
	[Street] [nvarchar](500) NULL,
	[District] [nvarchar](500) NULL,
	[City] [nvarchar](500) NULL,
	[PostCode] [nvarchar](500) NULL,
	[AdditionalNumber] [nvarchar](500) NULL,
	[RegionName] [nvarchar](500) NULL,
	[PolygonString] [nvarchar](max) NULL,
	[IsPrimaryAddress] [nvarchar](500) NULL,
	[UnitNumber] [nvarchar](500) NULL,
	[Latitude] [nvarchar](500) NULL,
	[Longitude] [nvarchar](500) NULL,
	[CityId] [nvarchar](500) NULL,
	[RegionId] [nvarchar](500) NULL,
	[Restriction] [nvarchar](500) NULL,
	[PKAddressID] [nvarchar](500) NULL,
	[DriverId] [uniqueidentifier] NULL,
	[AddressLoction] [nvarchar](50) NULL,
 CONSTRAINT [PK_Address] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](128) NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
	[AspNetUser_Id] [nvarchar](128) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](128) NOT NULL,
	[ProviderKey] [nvarchar](128) NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,
	[AspNetUser_Id] [nvarchar](128) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC,
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nvarchar](128) NOT NULL,
	[RoleId] [nvarchar](128) NOT NULL,
	[AspNetUser_Id] [nvarchar](128) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](128) NOT NULL,
	[RoleId] [uniqueidentifier] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[LastModifiedDate] [datetime] NOT NULL,
	[LastLoginDate] [datetime] NOT NULL,
	[DeviceToken] [nvarchar](max) NULL,
	[LanguageId] [uniqueidentifier] NOT NULL,
	[Email] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEndDateUtc] [datetime] NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
	[UserName] [nvarchar](256) NOT NULL,
	[FullName] [nvarchar](max) NULL,
 CONSTRAINT [PK_dbo.AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Attachment]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Attachment](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Guid] [uniqueidentifier] NOT NULL,
	[AttachmentFile] [image] NULL,
	[AttachmentType] [nvarchar](50) NULL,
	[AttachmentName] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK__Attachme__3214EC077F8256EB] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BankCode]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BankCode](
	[Code] [int] NOT NULL,
	[EnglishDescription] [nvarchar](200) NULL,
	[ArabicDescription] [nvarchar](200) NULL,
	[ValidationCode] [int] NULL,
 CONSTRAINT [PK_BankCode] PRIMARY KEY CLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Benefit]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Benefit](
	[Code] [smallint] IDENTITY(1,1) NOT NULL,
	[EnglishDescription] [nvarchar](200) NULL,
	[ArabicDescription] [nvarchar](200) NULL,
 CONSTRAINT [PK_Benefit] PRIMARY KEY CLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BreakingSystem]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BreakingSystem](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [int] NULL,
	[NameAr] [nvarchar](500) NULL,
	[NameEn] [nvarchar](500) NULL,
 CONSTRAINT [PK__Breaking__3214EC079D6FBC87] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CameraType]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CameraType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [int] NULL,
	[NameAr] [nvarchar](500) NULL,
	[NameEn] [nvarchar](500) NULL,
 CONSTRAINT [PK__CameraTy__3214EC07E69DAA55] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CardIDType]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CardIDType](
	[Code] [tinyint] IDENTITY(1,1) NOT NULL,
	[EnglishDescription] [nvarchar](200) NULL,
	[ArabicDescription] [nvarchar](200) NULL,
 CONSTRAINT [PK_CardIDType] PRIMARY KEY CLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Checkout_PayfortPaymentReq]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Checkout_PayfortPaymentReq](
	[PayfortPaymentRequestId] [int] NOT NULL,
	[CheckoutdetailsId] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Checkout_PayfortPaymentReq] PRIMARY KEY CLUSTERED 
(
	[PayfortPaymentRequestId] ASC,
	[CheckoutdetailsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CheckoutAdditionalDrivers]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CheckoutAdditionalDrivers](
	[CheckoutDetailsId] [nvarchar](50) NOT NULL,
	[DriverId] [uniqueidentifier] NOT NULL,
	[Id] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_CheckoutAdditionalDrivers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CheckoutCarImages]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CheckoutCarImages](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ImageData] [image] NULL,
 CONSTRAINT [PK_CheckoutCarImages] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CheckoutDetails]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CheckoutDetails](
	[ReferenceId] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](50) NULL,
	[Phone] [nvarchar](50) NULL,
	[IBAN] [nvarchar](50) NULL,
	[PaymentMethodCode] [tinyint] NULL,
	[ImageRightId] [int] NULL,
	[ImageLeftId] [int] NULL,
	[ImageFrontId] [int] NULL,
	[ImageBackId] [int] NULL,
	[ImageBodyId] [int] NULL,
	[UserId] [nvarchar](128) NOT NULL,
	[VehicleId] [uniqueidentifier] NOT NULL,
	[MainDriverId] [uniqueidentifier] NULL,
	[PolicyStatusId] [int] NULL,
	[CreatedDateTimeUtc] [datetime] NULL,
	[SelectedProductId] [uniqueidentifier] NULL,
	[SelectedInsuranceTypeCode] [smallint] NULL,
	[bankCode] [nvarchar](50) NULL,
 CONSTRAINT [PK_CheckoutDetails] PRIMARY KEY CLUSTERED 
(
	[ReferenceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[City]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[City](
	[Code] [bigint] IDENTITY(1,1) NOT NULL,
	[EnglishDescription] [nvarchar](128) NULL,
	[ArabicDescription] [nvarchar](128) NULL,
 CONSTRAINT [PK_City] PRIMARY KEY CLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Clients]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clients](
	[Id] [nvarchar](128) NOT NULL,
	[Secret] [nvarchar](max) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[ApplicationType] [int] NOT NULL,
	[Active] [bit] NOT NULL,
	[RefreshTokenLifeTime] [int] NOT NULL,
	[AllowedOrigin] [nvarchar](100) NULL,
	[AuthServerUrl] [nvarchar](100) NULL,
	[RedirectUrl] [nvarchar](100) NULL,
 CONSTRAINT [PK_dbo.Clients] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Contact]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contact](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[MobileNumber] [nvarchar](50) NULL,
	[HomePhone] [nvarchar](50) NULL,
	[Fax] [nvarchar](50) NULL,
	[Email] [nvarchar](50) NULL,
 CONSTRAINT [PK_Contact] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Country]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Country](
	[Code] [smallint] NOT NULL,
	[EnglishDescription] [nvarchar](256) NULL,
	[ArabicDescription] [nvarchar](256) NULL,
 CONSTRAINT [PK_Country] PRIMARY KEY CLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Deductible]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Deductible](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[InsuranceCompanyID] [int] NOT NULL,
	[Name] [decimal](8, 2) NOT NULL,
 CONSTRAINT [PK_Deductible] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DistanceRange]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DistanceRange](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [int] NULL,
	[NameAr] [nvarchar](500) NULL,
	[NameEn] [nvarchar](500) NULL,
 CONSTRAINT [PK__Distance__3214EC07E8E2A7CF] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Driver]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Driver](
	[DriverId] [uniqueidentifier] NOT NULL,
	[IsCitizen] [bit] NOT NULL,
	[EnglishFirstName] [nvarchar](max) NULL,
	[EnglishLastName] [nvarchar](max) NULL,
	[EnglishSecondName] [nvarchar](max) NULL,
	[EnglishThirdName] [nvarchar](max) NULL,
	[LastName] [nvarchar](max) NULL,
	[SecondName] [nvarchar](max) NULL,
	[FirstName] [nvarchar](max) NULL,
	[ThirdName] [nvarchar](max) NULL,
	[SubtribeName] [nvarchar](max) NULL,
	[DateOfBirthG] [datetime] NULL,
	[NationalityCode] [smallint] NULL,
	[DateOfBirthH] [nvarchar](100) NULL,
	[NIN] [nvarchar](max) NULL,
	[IsSpecialNeed] [bit] NULL,
	[IdIssuePlace] [nvarchar](50) NULL,
	[IdExpiryDate] [nvarchar](50) NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedUtcDateTime] [datetime] NULL,
	[MaritalStatusCode] [int] NULL,
	[NumOfChildsUnder16] [int] NULL,
	[ViolationId] [int] NULL,
	[OccupationId] [int] NULL,
	[ResidentOccupation] [nvarchar](50) NULL,
	[GenderId] [int] NOT NULL,
	[SocialStatusId] [int] NULL,
	[MedicalConditionId] [int] NULL,
	[DrivingPercentage] [decimal](18, 0) NULL,
	[EducationId] [int] NOT NULL,
	[ChildrenBelow16Years] [int] NULL,
	[CityId] [bigint] NULL,
	[WorkCityId] [bigint] NULL,
	[NOALast5Years] [int] NULL,
	[NOCLast5Years] [int] NULL,
	[NCDFreeYears] [int] NULL,
	[NCDReference] [nvarchar](50) NULL,
	[DrivingLicenseTypeCode] [int] NULL,
	[SaudiLicenseHeldYears] [int] NULL,
	[EligibleForNoClaimsDiscountYears] [int] NULL,
	[NumOfFaultAccidentInLast5Years] [int] NULL,
	[NumOfFaultclaimInLast5Years] [int] NULL,
	[RoadConvictions] [nvarchar](max) NULL,
 CONSTRAINT [PK_Driver] PRIMARY KEY CLUSTERED 
(
	[DriverId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DriverLicense]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DriverLicense](
	[LicenseId] [int] IDENTITY(1,1) NOT NULL,
	[DriverId] [uniqueidentifier] NOT NULL,
	[TypeDesc] [smallint] NOT NULL,
	[ExpiryDateH] [nvarchar](20) NULL,
 CONSTRAINT [PK_DriverLicense] PRIMARY KEY CLUSTERED 
(
	[LicenseId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DriverMedicalCondition]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DriverMedicalCondition](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [int] NULL,
	[NameAr] [nvarchar](500) NULL,
	[NameEn] [nvarchar](500) NULL,
 CONSTRAINT [PK__DriverMe__3214EC0759BB4C83] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DriverType]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DriverType](
	[Code] [tinyint] IDENTITY(1,1) NOT NULL,
	[EnglishDescription] [nvarchar](200) NULL,
	[ArabicDescription] [nvarchar](200) NULL,
 CONSTRAINT [PK_DriverType] PRIMARY KEY CLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DriverViolation]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DriverViolation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DriverId] [uniqueidentifier] NOT NULL,
	[ViolationId] [int] NOT NULL,
 CONSTRAINT [PK__DriverVi__3214EC07F2B7890B] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DrivingLicenceYear]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DrivingLicenceYear](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [int] NOT NULL,
	[NameAr] [nvarchar](500) NULL,
	[NameEn] [nvarchar](500) NULL,
 CONSTRAINT [PK__DrivingL__3214EC07F67EBDE4] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EducationLevel]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EducationLevel](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [int] NULL,
	[NameAr] [nvarchar](500) NULL,
	[NameEn] [nvarchar](500) NULL,
 CONSTRAINT [PK__Educatio__3214EC07CF78605D] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ErrorCode]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ErrorCode](
	[Code] [smallint] NOT NULL,
	[EnglishText] [nvarchar](50) NULL,
	[EnglishDescription] [nvarchar](200) NULL,
	[ArabicText] [nvarchar](50) NULL,
	[ArabicDescription] [nvarchar](200) NULL,
 CONSTRAINT [PK_ErrorCode] PRIMARY KEY CLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Gender]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Gender](
	[Code] [nvarchar](1) NOT NULL,
	[EnglishDescription] [nvarchar](10) NULL,
	[ArabicDescription] [nvarchar](10) NULL,
 CONSTRAINT [PK_Gender] PRIMARY KEY CLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[InsuaranceCompanyBenefit]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InsuaranceCompanyBenefit](
	[BenefitID] [uniqueidentifier] NOT NULL,
	[InsurnaceCompanyID] [int] NOT NULL,
	[BenefitCode] [smallint] NOT NULL,
	[BenefitPrice] [decimal](8, 2) NOT NULL,
 CONSTRAINT [PK_InsuaranceCompanyBenefit] PRIMARY KEY CLUSTERED 
(
	[BenefitID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[InsuranceCompany]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InsuranceCompany](
	[InsuranceCompanyID] [int] IDENTITY(1,1) NOT NULL,
	[NameAR] [nvarchar](50) NOT NULL,
	[NameEN] [nvarchar](50) NOT NULL,
	[DescAR] [nvarchar](1000) NULL,
	[DescEN] [nvarchar](1000) NULL,
	[CreatedDate] [datetime] NOT NULL,
	[CreatedBy] [uniqueidentifier] NULL,
	[LastModifiedDate] [datetime] NULL,
	[ModifiedBy] [uniqueidentifier] NULL,
	[AddressId] [int] NULL,
	[ContactId] [int] NULL,
	[TEMP] [nvarchar](1000) NULL,
	[NamespaceTypeName] [nvarchar](200) NULL,
	[ClassTypeName] [nvarchar](200) NULL,
	[ReportTemplateName] [nvarchar](200) NULL,
	[isActive] [bit] NOT NULL,
 CONSTRAINT [PK_InsuranceCompany] PRIMARY KEY CLUSTERED 
(
	[InsuranceCompanyID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[InsuranceCompanyProductTypeConfig]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InsuranceCompanyProductTypeConfig](
	[ProductTypeCode] [smallint] NOT NULL,
	[InsuranceCompanyID] [int] NOT NULL,
	[MinDriverAge] [tinyint] NOT NULL,
	[MaxDriverAge] [tinyint] NOT NULL,
	[MaxVehicleAge] [tinyint] NOT NULL,
 CONSTRAINT [PK_InsuranceCompanyProductTypeConfig] PRIMARY KEY CLUSTERED 
(
	[ProductTypeCode] ASC,
	[InsuranceCompanyID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Insured]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Insured](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NationalId] [nvarchar](20) NOT NULL,
	[CardIdTypeId] [int] NOT NULL,
	[BirthDate] [datetime] NOT NULL,
	[BirthDateH] [nvarchar](10) NULL,
	[GenderId] [int] NULL,
	[NationalityCode] [nvarchar](4) NULL,
	[IdIssueCityId] [bigint] NOT NULL,
	[FirstNameAr] [nvarchar](50) NOT NULL,
	[MiddleNameAr] [nvarchar](50) NULL,
	[LastNameAr] [nvarchar](50) NOT NULL,
	[FirstNameEn] [nvarchar](50) NOT NULL,
	[MiddleNameEn] [nvarchar](50) NULL,
	[LastNameEn] [nvarchar](50) NOT NULL,
	[SocialStatusId] [int] NOT NULL,
	[OccupationId] [int] NOT NULL,
	[ResidentOccupation] [nvarchar](50) NULL,
	[EducationId] [int] NOT NULL,
	[ChildrenBelow16Years] [int] NULL,
	[WorkCityId] [bigint] NULL,
	[CityId] [bigint] NULL,
 CONSTRAINT [PK__Insured__3214EC0709618099] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[IntegrationTransaction]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IntegrationTransaction](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[MessageId] [uniqueidentifier] NULL,
	[Method] [nvarchar](200) NULL,
	[InputParams] [nvarchar](max) NULL,
	[OutputResults] [nvarchar](max) NULL,
	[Status] [int] NULL,
	[TransactionDate] [datetime] NULL,
 CONSTRAINT [PK_IntegrationTransaction] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Invoice]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Invoice](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InvoiceNo] [int] NOT NULL,
	[InvoiceDate] [datetime] NOT NULL,
	[InvoiceDueDate] [datetime] NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,
	[ReferenceId] [nvarchar](200) NULL,
	[InsuranceTypeCode] [smallint] NULL,
	[InsuranceCompanyId] [int] NULL,
	[PolicyId] [int] NULL,
	[ProductPrice] [decimal](8, 2) NULL,
	[Fees] [decimal](8, 2) NULL,
	[Vat] [decimal](8, 2) NULL,
	[SubTotalPrice] [decimal](8, 2) NULL,
	[TotalPrice] [decimal](8, 2) NULL,
	[ExtraPremiumPrice] [decimal](8, 2) NULL,
	[Discount] [decimal](8, 2) NULL,
 CONSTRAINT [PK_Invoice] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Invoice_Benefit]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Invoice_Benefit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InvoiceId] [int] NULL,
	[BenefitId] [smallint] NULL,
	[BenefitPrice] [decimal](8, 2) NULL,
 CONSTRAINT [PK_Invoice_Benefit] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[InvoiceFile]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InvoiceFile](
	[Id] [int] NOT NULL,
	[InvoiceData] [image] NULL,
 CONSTRAINT [PK_InvoiceFile] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Language]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Language](
	[Id] [uniqueidentifier] NOT NULL,
	[NameAR] [nvarchar](50) NOT NULL,
	[NameEN] [nvarchar](50) NOT NULL,
	[isDefault] [bit] NOT NULL,
 CONSTRAINT [PK_Language] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LicenseType]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LicenseType](
	[Code] [smallint] IDENTITY(1,1) NOT NULL,
	[EnglishDescription] [nvarchar](200) NULL,
	[ArabicDescription] [nvarchar](200) NULL,
 CONSTRAINT [PK_LicenseType] PRIMARY KEY CLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Logger]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Logger](
	[Id] [uniqueidentifier] NOT NULL,
	[StackTrace] [nvarchar](max) NULL,
	[Message] [nvarchar](max) NULL,
	[ExceptionAsString] [nvarchar](max) NULL,
	[ExceptionDate] [datetime] NULL,
	[key] [nvarchar](max) NULL,
	[Level] [int] NULL,
 CONSTRAINT [PK_Logger] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NajmStatusHistory]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NajmStatusHistory](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ReferenceId] [nvarchar](50) NOT NULL,
	[PolicyNo] [nvarchar](50) NOT NULL,
	[StatusCode] [int] NOT NULL,
	[StatusDescription] [nvarchar](2000) NULL,
	[UploadedDate] [datetime] NULL,
	[UploadedReference] [nvarchar](50) NULL,
 CONSTRAINT [PK_NajmStatusHistory] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NCDFreeYear]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NCDFreeYear](
	[Code] [tinyint] NOT NULL,
	[EnglishDescription] [nvarchar](200) NULL,
	[ArabicDescription] [nvarchar](200) NULL,
 CONSTRAINT [PK_NCDFreeYear] PRIMARY KEY CLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Notification]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Notification](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Group] [nvarchar](256) NOT NULL,
	[GroupReferenceId] [nvarchar](256) NULL,
	[TypeId] [int] NOT NULL,
	[StatusId] [int] NOT NULL,
	[CreatedAtUtc] [datetime] NOT NULL,
 CONSTRAINT [PK_Notification] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NotificationParameter]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NotificationParameter](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	[Value] [nvarchar](max) NOT NULL,
	[NotificationId] [int] NOT NULL,
 CONSTRAINT [PK_NotificationParameter] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Occupation]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Occupation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [int] NULL,
	[NameAr] [nvarchar](100) NULL,
	[NameEn] [nvarchar](100) NULL,
 CONSTRAINT [PK__Occupati__3214EC0767A1E218] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ParkingPlace]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ParkingPlace](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [int] NULL,
	[NameAr] [nvarchar](500) NULL,
	[NameEn] [nvarchar](500) NULL,
 CONSTRAINT [PK__ParkingP__3214EC078FCF4A9C] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PayfortPaymentRequest]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PayfortPaymentRequest](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,
	[Amount] [decimal](10, 4) NULL,
	[ReferenceNumber] [nvarchar](20) NOT NULL,
 CONSTRAINT [PK_PayfortPaymentRequest] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PayfortPaymentResponse]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PayfortPaymentResponse](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[RequestId] [int] NOT NULL,
	[ResponseCode] [int] NOT NULL,
	[ResponseMessage] [nvarchar](200) NULL,
	[Amount] [decimal](10, 4) NULL,
	[PaymentOption] [nvarchar](20) NULL,
	[CardNumber] [nvarchar](20) NULL,
	[CardHolerName] [nvarchar](50) NULL,
	[CardExpiryDate] [nvarchar](5) NULL,
	[CustomerIP] [nvarchar](50) NULL,
	[FortId] [nvarchar](25) NULL,
	[status] [smallint] NULL,
	[CustomerEmail] [nvarchar](256) NULL,
	[Signature] [nvarchar](max) NULL,
 CONSTRAINT [PK_PayfortPaymentResponse] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payment]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payment](
	[BillNumber] [int] IDENTITY(1,1) NOT NULL,
	[ReferenceID] [nvarchar](50) NULL,
	[UserID] [nvarchar](50) NULL,
	[IBNA] [nvarchar](25) NULL,
	[BankCode] [int] NULL,
	[PaymentStatus] [int] NULL,
 CONSTRAINT [PK_Payment] PRIMARY KEY CLUSTERED 
(
	[BillNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PaymentMethod]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PaymentMethod](
	[Code] [tinyint] IDENTITY(1,1) NOT NULL,
	[EnglishDescription] [nvarchar](200) NULL,
	[ArabicDescription] [nvarchar](200) NULL,
	[IsImplemented] [bit] NOT NULL,
 CONSTRAINT [PK_PaymentMethod] PRIMARY KEY CLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Policy]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Policy](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InsuranceCompanyID] [int] NULL,
	[StatusCode] [tinyint] NOT NULL,
	[PolicyNo] [nvarchar](36) NOT NULL,
	[PolicyIssueDate] [datetime] NULL,
	[PolicyEffectiveDate] [datetime] NULL,
	[PolicyExpiryDate] [datetime] NULL,
	[CheckOutDetailsId] [nvarchar](50) NOT NULL,
	[PolicyFileId] [uniqueidentifier] NULL,
	[NajmStatus] [nvarchar](max) NULL,
	[IsRefunded] [bit] NOT NULL,
 CONSTRAINT [PK_Policy] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PolicyDetails]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PolicyDetails](
	[Id] [int] NOT NULL,
	[DocumentSerialNo] [nvarchar](max) NULL,
	[PolicyNo] [nvarchar](max) NULL,
	[InsuranceStartDate] [nvarchar](max) NULL,
	[InsuranceEndDate] [nvarchar](max) NULL,
	[PolicyIssueDate] [nvarchar](max) NULL,
	[PolicyIssueTime] [nvarchar](max) NULL,
	[PolicyCoverTypeEn] [nvarchar](max) NULL,
	[PolicyCoverTypeAr] [nvarchar](max) NULL,
	[PolicyCoverAgeLimitEn] [nvarchar](max) NULL,
	[PolicyCoverAgeLimitAr] [nvarchar](max) NULL,
	[PolicyAdditionalCoversEn] [nvarchar](max) NULL,
	[PolicyAdditionalCoversAr] [nvarchar](max) NULL,
	[PolicyGeographicalAreaEn] [nvarchar](max) NULL,
	[PolicyGeographicalAreaAr] [nvarchar](max) NULL,
	[InsuredNameEn] [nvarchar](max) NULL,
	[InsuredNameAr] [nvarchar](max) NULL,
	[InsuredMobile] [nvarchar](max) NULL,
	[InsuredID] [nvarchar](max) NULL,
	[InsuredCity] [nvarchar](max) NULL,
	[InsuredDisctrict] [nvarchar](max) NULL,
	[InsuredStreet] [nvarchar](max) NULL,
	[InsuredBuildingNo] [nvarchar](max) NULL,
	[InsuredZipCode] [nvarchar](max) NULL,
	[InsuredAdditionalNo] [nvarchar](max) NULL,
	[VehicleMakeEn] [nvarchar](max) NULL,
	[VehicleMakeAr] [nvarchar](max) NULL,
	[VehicleModelEn] [nvarchar](max) NULL,
	[VehicleModelAr] [nvarchar](max) NULL,
	[VehiclePlateTypeEn] [nvarchar](max) NULL,
	[VehiclePlateTypeAr] [nvarchar](max) NULL,
	[VehiclePlateNoEn] [nvarchar](max) NULL,
	[VehiclePlateNoAr] [nvarchar](max) NULL,
	[VehicleChassis] [nvarchar](max) NULL,
	[VehicleBodyEn] [nvarchar](max) NULL,
	[VehicleBodyAr] [nvarchar](max) NULL,
	[VehicleYear] [nvarchar](max) NULL,
	[VehicleColorEn] [nvarchar](max) NULL,
	[VehicleColorAr] [nvarchar](max) NULL,
	[VehicleCapacity] [nvarchar](max) NULL,
	[VehicleSequenceNo] [nvarchar](max) NULL,
	[VehicleCustomNo] [nvarchar](max) NULL,
	[VehicleOwnerName] [nvarchar](max) NULL,
	[VehicleOwnerID] [nvarchar](max) NULL,
	[VehicleUsingPurposesEn] [nvarchar](max) NULL,
	[VehicleUsingPurposesAr] [nvarchar](max) NULL,
	[VehicleRegistrationExpiryDate] [nvarchar](max) NULL,
	[VehicleValue] [nvarchar](max) NULL,
	[OfficePremium] [nvarchar](max) NULL,
	[PACover] [nvarchar](max) NULL,
	[ValueExcess] [nvarchar](max) NULL,
	[TotalPremium] [nvarchar](max) NULL,
	[NCDPercentage] [nvarchar](max) NULL,
	[NCDAmount] [nvarchar](max) NULL,
	[VATPercentage] [nvarchar](max) NULL,
	[VATAmount] [nvarchar](max) NULL,
	[CommissionPaid] [nvarchar](max) NULL,
	[PolicyFees] [nvarchar](max) NULL,
	[ClalmLoadingPercentage] [nvarchar](max) NULL,
	[ClalmLoadingAmount] [nvarchar](max) NULL,
	[AgeLoadingAmount] [nvarchar](max) NULL,
	[AgeLoadingPercentage] [nvarchar](max) NULL,
	[DeductibleValue] [nvarchar](max) NULL,
	[InsuranceStartDateH] [nvarchar](max) NULL,
	[InsuranceEndDateH] [nvarchar](max) NULL,
	[InsuredAge] [nvarchar](max) NULL,
	[NCDFreeYears] [nvarchar](max) NULL,
	[AccidentNo] [nvarchar](max) NULL,
	[AccidentLoadingPercentage] [nvarchar](max) NULL,
	[AccidentLoadingAmount] [nvarchar](max) NULL,
 CONSTRAINT [PK_PolicyDetails] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PolicyFile]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PolicyFile](
	[ID] [uniqueidentifier] NOT NULL,
	[PolicyFileByte] [image] NULL,
 CONSTRAINT [PK_PolicyFile] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PolicyProcessingQueue]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PolicyProcessingQueue](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ReferenceId] [nvarchar](50) NOT NULL,
	[PriorityId] [int] NOT NULL,
	[CreatedOnUtc] [datetime] NOT NULL,
	[DontProcessBeforeDateUtc] [datetime] NULL,
	[ProcessingTries] [int] NOT NULL,
	[ProcessedOnUtc] [datetime] NULL,
 CONSTRAINT [PK__PolicyPr__3214EC074BF80DB1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PolicyStatus]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PolicyStatus](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Key] [nvarchar](200) NULL,
	[Name] [nvarchar](200) NOT NULL,
 CONSTRAINT [PK_PolicyStatus] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PolicyUpdatePayment]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PolicyUpdatePayment](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PolicyUpdateRequestId] [int] NOT NULL,
	[Amount] [decimal](8, 2) NULL,
	[Description] [nvarchar](1000) NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedAtUTC] [datetime] NOT NULL,
 CONSTRAINT [PK__PolicyUp__3214EC071332C07B] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PolicyUpdateRequest]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PolicyUpdateRequest](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PolicyId] [int] NULL,
	[RequestTypeId] [int] NOT NULL,
	[StatusId] [int] NOT NULL,
	[Guid] [nvarchar](50) NULL,
 CONSTRAINT [PK__PolicyUp__3214EC0760BBCD36] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PolicyUpdateRequestAttachment]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PolicyUpdateRequestAttachment](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PolicyUpdReqId] [int] NOT NULL,
	[AttachmentId] [int] NOT NULL,
	[AttachmentTypeId] [int] NOT NULL,
 CONSTRAINT [PK__PolicyUp__3214EC07E5453B9F] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PolicyUpdReq_PayfortPaymentReq]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PolicyUpdReq_PayfortPaymentReq](
	[PayfortPaymentRequestId] [int] NOT NULL,
	[PolicyUpdateRequestId] [int] NOT NULL,
 CONSTRAINT [PK_PolicyUpdReq_PayfortPaymentReq] PRIMARY KEY CLUSTERED 
(
	[PayfortPaymentRequestId] ASC,
	[PolicyUpdateRequestId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PriceDetail]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PriceDetail](
	[DetailId] [uniqueidentifier] NOT NULL,
	[ProductID] [uniqueidentifier] NOT NULL,
	[PriceTypeCode] [tinyint] NOT NULL,
	[PriceValue] [decimal](8, 2) NOT NULL,
	[PercentageValue] [decimal](8, 2) NULL,
 CONSTRAINT [PK_PriceDetail] PRIMARY KEY CLUSTERED 
(
	[DetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PriceType]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PriceType](
	[Code] [tinyint] IDENTITY(1,1) NOT NULL,
	[EnglishDescription] [nvarchar](200) NULL,
	[ArabicDescription] [nvarchar](200) NULL,
 CONSTRAINT [PK_PriceType] PRIMARY KEY CLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[Id] [uniqueidentifier] NOT NULL,
	[ExternalProductId] [nvarchar](100) NULL,
	[QuotaionNo] [nvarchar](50) NOT NULL,
	[QuotationDate] [datetime] NULL,
	[QuotationExpiryDate] [datetime] NULL,
	[ProviderId] [int] NULL,
	[ProductNameAr] [nvarchar](max) NULL,
	[ProductNameEn] [nvarchar](max) NULL,
	[ProductDescAr] [nvarchar](max) NULL,
	[ProductDescEn] [nvarchar](max) NULL,
	[ProductPrice] [decimal](19, 4) NOT NULL,
	[DeductableValue] [int] NULL,
	[VehicleLimitValue] [int] NULL,
	[QuotationResponseId] [int] NULL,
	[ProductImage] [varchar](250) NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product_Benefit]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product_Benefit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProductId] [uniqueidentifier] NULL,
	[BenefitId] [smallint] NULL,
	[IsSelected] [bit] NULL,
	[BenefitPrice] [decimal](19, 4) NULL,
	[BenefitExternalId] [nvarchar](50) NULL,
 CONSTRAINT [PK_Product_Benefit] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductType]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductType](
	[Code] [smallint] NOT NULL,
	[EnglishDescription] [nvarchar](200) NULL,
	[ArabicDescription] [nvarchar](200) NULL,
 CONSTRAINT [PK_ProductType] PRIMARY KEY CLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[QuotationRequest]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QuotationRequest](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ExternalId] [nvarchar](50) NOT NULL,
	[MainDriverId] [uniqueidentifier] NOT NULL,
	[CityCode] [bigint] NOT NULL,
	[RequestPolicyEffectiveDate] [datetime] NULL,
	[VehicleId] [uniqueidentifier] NOT NULL,
	[UserId] [nvarchar](128) NULL,
	[NajmNcdRefrence] [nvarchar](128) NULL,
	[NajmNcdFreeYears] [int] NULL,
	[CreatedDateTimeUtc] [datetime] NOT NULL,
	[IsComprehensiveGenerated] [bit] NOT NULL,
	[IsComprehensiveRequested] [bit] NOT NULL,
	[InsuredId] [int] NOT NULL,
 CONSTRAINT [PK_QuotationRequest] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[QuotationRequestAdditionalDrivers]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QuotationRequestAdditionalDrivers](
	[QuotationRequestId] [int] NOT NULL,
	[AdditionalDriverId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_QuotationRequestAdditionalDrivers] PRIMARY KEY CLUSTERED 
(
	[QuotationRequestId] ASC,
	[AdditionalDriverId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[QuotationResponse]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QuotationResponse](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RequestId] [int] NULL,
	[InsuranceTypeCode] [smallint] NULL,
	[CreateDateTimeUtc] [datetime] NOT NULL,
	[VehicleAgencyRepair] [bit] NULL,
	[DeductibleValue] [smallint] NULL,
	[ReferenceId] [nvarchar](50) NOT NULL,
	[InsuranceCompanyId] [int] NOT NULL,
 CONSTRAINT [PK_QuotationResponse] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[ID] [uniqueidentifier] NOT NULL,
	[RoleTypeID] [uniqueidentifier] NOT NULL,
	[RoleNameAR] [nvarchar](50) NOT NULL,
	[RoleNameEN] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RoleType]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RoleType](
	[ID] [uniqueidentifier] NOT NULL,
	[TypeNameAR] [nvarchar](50) NOT NULL,
	[TypeNameEN] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_RoleType] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SadadNotificationMessage]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SadadNotificationMessage](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[HeadersReceiver] [nvarchar](50) NULL,
	[HeadersSender] [nvarchar](50) NULL,
	[HeadersMessageType] [nvarchar](10) NULL,
	[HeadersTimeStamp] [datetime] NULL,
	[BodysAccountNo] [nvarchar](25) NULL,
	[BodysAmount] [decimal](6, 2) NULL,
	[BodysCustomerRefNo] [nvarchar](25) NULL,
	[BodysTransType] [nvarchar](10) NULL,
	[BodysDescription] [nvarchar](200) NULL,
	[CreatedUtcDate] [datetime] NULL,
 CONSTRAINT [PK_SadadNotificationMessage] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SadadNotificationResponse]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SadadNotificationResponse](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[NotificationMessageId] [int] NOT NULL,
	[HeadersReceiver] [nvarchar](50) NULL,
	[HeadersSender] [nvarchar](50) NULL,
	[HeadersMessageType] [nvarchar](10) NULL,
	[HeadersTimeStamp] [datetime] NULL,
	[Status] [nvarchar](10) NOT NULL,
 CONSTRAINT [PK_SadadNotificationResponse] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SadadRequests]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SadadRequests](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CustomerAccountNumber] [nvarchar](20) NOT NULL,
	[CustomerAccountName] [nvarchar](200) NOT NULL,
	[BillAmount] [decimal](6, 2) NOT NULL,
	[BillOpenDate] [datetime] NOT NULL,
	[BillDueDate] [datetime] NOT NULL,
	[BillExpiryDate] [datetime] NOT NULL,
	[BillCloseDate] [datetime] NOT NULL,
	[BillMaxAdvanceAmount] [decimal](6, 2) NULL,
	[BillMinAdvanceAmount] [decimal](6, 2) NULL,
	[BillMinPartialAmount] [decimal](6, 2) NULL,
 CONSTRAINT [PK_SadadRequests] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SadadResponses]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SadadResponses](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[SadadRequestId] [int] NOT NULL,
	[Status] [nvarchar](10) NOT NULL,
	[ErrorCode] [int] NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[TrackingId] [int] NOT NULL,
 CONSTRAINT [PK_SadadResponses] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ScheduleTask]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ScheduleTask](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Seconds] [int] NOT NULL,
	[Type] [nvarchar](max) NOT NULL,
	[Enabled] [bit] NOT NULL,
	[StopOnError] [bit] NOT NULL,
	[LeasedByMachineName] [nvarchar](max) NULL,
	[LeasedUntilUtc] [datetime] NULL,
	[LastStartUtc] [datetime] NULL,
	[LastEndUtc] [datetime] NULL,
	[LastSuccessUtc] [datetime] NULL,
 CONSTRAINT [PK__Schedule__3214EC072932D962] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sensor]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sensor](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [int] NULL,
	[NameAr] [nvarchar](500) NULL,
	[NameEn] [nvarchar](500) NULL,
 CONSTRAINT [PK__Sensor__3214EC0720E20DAE] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ShoppingCartItem]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ShoppingCartItem](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,
	[ProductId] [uniqueidentifier] NOT NULL,
	[Quantity] [int] NOT NULL,
	[CreatedOnUtc] [datetime] NOT NULL,
	[UpdatedOnUtc] [datetime] NOT NULL,
 CONSTRAINT [PK__Shopping__3214EC078EF48979] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ShoppingCartItemBenefit]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ShoppingCartItemBenefit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ShoppingCartItemId] [int] NOT NULL,
	[ProductBenefitId] [int] NOT NULL,
 CONSTRAINT [PK__Shopping__3214EC07F7A09A4A] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SpeedStabilizer]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SpeedStabilizer](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [int] NULL,
	[NameAr] [nvarchar](500) NULL,
	[NameEn] [nvarchar](500) NULL,
 CONSTRAINT [PK__SpeedSta__3214EC077714F22D] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TawuniyaTempTable]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TawuniyaTempTable](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[QtServiceRequestMessage] [nvarchar](max) NULL,
	[PorposalResponse] [nvarchar](max) NULL,
	[ReferenceId] [nvarchar](200) NULL,
 CONSTRAINT [PK__Tawuniya__3214EC070B9C4C83] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vehicle_VehicleSpecification]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vehicle_VehicleSpecification](
	[VehicleId] [uniqueidentifier] NOT NULL,
	[VehicleSpecificationId] [int] NOT NULL,
 CONSTRAINT [VehicleS_VehicleSpec_PK] PRIMARY KEY CLUSTERED 
(
	[VehicleId] ASC,
	[VehicleSpecificationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VehicleBodyType]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VehicleBodyType](
	[Code] [tinyint] IDENTITY(1,1) NOT NULL,
	[EnglishDescription] [nvarchar](200) NULL,
	[ArabicDescription] [nvarchar](200) NULL,
 CONSTRAINT [PK_VehicleBodyType] PRIMARY KEY CLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VehicleColor]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VehicleColor](
	[Code] [tinyint] NOT NULL,
	[EnglishDescription] [nvarchar](200) NULL,
	[ArabicDescription] [nvarchar](200) NULL,
 CONSTRAINT [PK_VehicleColor] PRIMARY KEY CLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VehicleIDType]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VehicleIDType](
	[Code] [tinyint] IDENTITY(1,1) NOT NULL,
	[EnglishDescription] [nvarchar](200) NULL,
	[ArabicDescription] [nvarchar](200) NULL,
 CONSTRAINT [PK_VehicleIDType] PRIMARY KEY CLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VehicleMaker]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VehicleMaker](
	[Code] [smallint] NOT NULL,
	[EnglishDescription] [nvarchar](50) NULL,
	[ArabicDescription] [nvarchar](50) NULL,
 CONSTRAINT [PK_VehicleMaker] PRIMARY KEY CLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VehicleModel]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VehicleModel](
	[Code] [bigint] NOT NULL,
	[VehicleMakerCode] [smallint] NOT NULL,
	[EnglishDescription] [nvarchar](50) NULL,
	[ArabicDescription] [nvarchar](50) NULL,
 CONSTRAINT [PK_VehicleModel_1] PRIMARY KEY CLUSTERED 
(
	[Code] ASC,
	[VehicleMakerCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VehiclePlateText]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VehiclePlateText](
	[Code] [tinyint] IDENTITY(1,1) NOT NULL,
	[EnglishDescription] [nvarchar](50) NULL,
	[ArabicDescription] [nvarchar](50) NULL,
 CONSTRAINT [PK_VehiclePlateText] PRIMARY KEY CLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VehiclePlateType]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VehiclePlateType](
	[Code] [tinyint] IDENTITY(1,1) NOT NULL,
	[EnglishDescription] [nvarchar](200) NULL,
	[ArabicDescription] [nvarchar](200) NULL,
 CONSTRAINT [PK_VehiclePlateType] PRIMARY KEY CLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vehicles]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vehicles](
	[ID] [uniqueidentifier] NOT NULL,
	[SequenceNumber] [nvarchar](30) NULL,
	[CustomCardNumber] [nvarchar](30) NULL,
	[Cylinders] [tinyint] NULL,
	[LicenseExpiryDate] [nvarchar](20) NULL,
	[MajorColor] [nvarchar](20) NULL,
	[MinorColor] [nvarchar](20) NULL,
	[ModelYear] [smallint] NULL,
	[PlateTypeCode] [tinyint] NOT NULL,
	[RegisterationPlace] [nvarchar](20) NULL,
	[VehicleBodyCode] [tinyint] NOT NULL,
	[VehicleWeight] [int] NOT NULL,
	[VehicleLoad] [int] NOT NULL,
	[VehicleMaker] [nvarchar](50) NULL,
	[VehicleModel] [nvarchar](30) NOT NULL,
	[ChassisNumber] [nvarchar](30) NULL,
	[VehicleMakerCode] [smallint] NULL,
	[VehicleModelCode] [bigint] NULL,
	[IsDeleted] [bit] NOT NULL,
	[CarPlateText1] [nvarchar](1) NULL,
	[CarPlateText2] [nvarchar](1) NULL,
	[CarPlateText3] [nvarchar](1) NULL,
	[CarPlateNumber] [smallint] NULL,
	[CarOwnerNIN] [nvarchar](max) NULL,
	[CarOwnerName] [nvarchar](max) NULL,
	[VehicleValue] [int] NULL,
	[IsUsedCommercially] [bit] NULL,
	[CreatedUtcDateTime] [datetime] NULL,
	[OwnerTransfer] [bit] NOT NULL,
	[EngineSizeId] [int] NULL,
	[VehicleUseId] [int] NULL,
	[CurrentMileageKM] [decimal](18, 0) NULL,
	[MileageExpectedAnnualId] [decimal](18, 0) NULL,
	[ParkingLocationId] [decimal](18, 0) NULL,
	[TransmissionTypeId] [int] NULL,
	[AxleWeightId] [decimal](18, 0) NULL,
	[HasModifications] [bit] NOT NULL,
	[ModificationDetails] [nvarchar](200) NULL,
	[VehicleIdTypeId] [int] NOT NULL,
 CONSTRAINT [PK_Vehicles] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VehicleSpecification]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VehicleSpecification](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [int] NOT NULL,
	[DescriptionAr] [nvarchar](100) NOT NULL,
	[DescriptionEn] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK__VehicleS__3214EC0728DD3E2B] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VehicleTransmissionType]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VehicleTransmissionType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [int] NULL,
	[NameAr] [nvarchar](500) NULL,
	[NameEn] [nvarchar](500) NULL,
 CONSTRAINT [PK__VehicleT__3214EC070298E33A] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VehicleUsagePercentage]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VehicleUsagePercentage](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [int] NULL,
	[NameAr] [nvarchar](50) NULL,
	[NameEn] [nvarchar](50) NULL,
 CONSTRAINT [PK__VehicleU__3214EC072ECA7B20] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Violation]    Script Date: 10/10/2018 3:34:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Violation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [int] NOT NULL,
	[DescriptionAr] [nvarchar](100) NOT NULL,
	[DescriptionEn] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK__Violatio__3214EC07CD1F20F5] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UserNameIndex]    Script Date: 10/10/2018 3:34:06 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex] ON [dbo].[AspNetUsers]
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Invoice_InvoiceNo]    Script Date: 10/10/2018 3:34:06 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_Invoice_InvoiceNo] ON [dbo].[Invoice]
(
	[InvoiceNo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_PayfortPaymentRequest_ReferenceNumber]    Script Date: 10/10/2018 3:34:06 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_PayfortPaymentRequest_ReferenceNumber] ON [dbo].[PayfortPaymentRequest]
(
	[ReferenceNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_QuotationRequest_Index]    Script Date: 10/10/2018 3:34:06 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_QuotationRequest_Index] ON [dbo].[QuotationRequest]
(
	[ExternalId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_SadadRequests_CustomerAccountNumber]    Script Date: 10/10/2018 3:34:06 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_SadadRequests_CustomerAccountNumber] ON [dbo].[SadadRequests]
(
	[CustomerAccountNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Driver] ADD  CONSTRAINT [DF_Driver_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[InsuranceCompany] ADD  CONSTRAINT [DF__Insurance__isAct__6DCC4D03]  DEFAULT ('1') FOR [isActive]
GO
ALTER TABLE [dbo].[Language] ADD  CONSTRAINT [DF_Language_isDefault]  DEFAULT ((0)) FOR [isDefault]
GO
ALTER TABLE [dbo].[PaymentMethod] ADD  CONSTRAINT [DF__PaymentMe__IsImp__6FB49575]  DEFAULT ((0)) FOR [IsImplemented]
GO
ALTER TABLE [dbo].[Policy] ADD  CONSTRAINT [DF__Policy__IsRefund__70A8B9AE]  DEFAULT ((0)) FOR [IsRefunded]
GO
ALTER TABLE [dbo].[PolicyUpdateRequest] ADD  CONSTRAINT [DF__PolicyUpd__Statu__719CDDE7]  DEFAULT ((0)) FOR [StatusId]
GO
ALTER TABLE [dbo].[QuotationRequest] ADD  CONSTRAINT [DF_QuotationRequest_IsComprehensiveGenerated]  DEFAULT ((0)) FOR [IsComprehensiveGenerated]
GO
ALTER TABLE [dbo].[QuotationRequest] ADD  CONSTRAINT [DF_QuotationRequest_IsComprehensiveRequested]  DEFAULT ((0)) FOR [IsComprehensiveRequested]
GO
ALTER TABLE [dbo].[QuotationResponse] ADD  CONSTRAINT [DF__Quotation__Insur__74794A92]  DEFAULT ((1)) FOR [InsuranceCompanyId]
GO
ALTER TABLE [dbo].[Vehicles] ADD  CONSTRAINT [DF_Vehicles_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Vehicles] ADD  CONSTRAINT [DF__Vehicles__OwnerT__756D6ECB]  DEFAULT ((0)) FOR [OwnerTransfer]
GO
ALTER TABLE [dbo].[Vehicles] ADD  CONSTRAINT [DF__Vehicles__HasMod__76619304]  DEFAULT ((0)) FOR [HasModifications]
GO
ALTER TABLE [dbo].[Vehicles] ADD  CONSTRAINT [DF__Vehicles__Vehicl__7755B73D]  DEFAULT ((1)) FOR [VehicleIdTypeId]
GO
ALTER TABLE [dbo].[AdditionalInfo]  WITH CHECK ADD  CONSTRAINT [FK_AdditionalInfo_CheckoutDetails] FOREIGN KEY([ReferenceId])
REFERENCES [dbo].[CheckoutDetails] ([ReferenceId])
GO
ALTER TABLE [dbo].[AdditionalInfo] CHECK CONSTRAINT [FK_AdditionalInfo_CheckoutDetails]
GO
ALTER TABLE [dbo].[Address]  WITH CHECK ADD  CONSTRAINT [FK_Address_Driver] FOREIGN KEY([DriverId])
REFERENCES [dbo].[Driver] ([DriverId])
GO
ALTER TABLE [dbo].[Address] CHECK CONSTRAINT [FK_Address_Driver]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserClaims_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_dbo.AspNetUserClaims_dbo.AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserLogins_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_dbo.AspNetUserLogins_dbo.AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUsers]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUsers_dbo.Language_LanguageId] FOREIGN KEY([LanguageId])
REFERENCES [dbo].[Language] ([Id])
GO
ALTER TABLE [dbo].[AspNetUsers] CHECK CONSTRAINT [FK_dbo.AspNetUsers_dbo.Language_LanguageId]
GO
ALTER TABLE [dbo].[AspNetUsers]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUsers_dbo.Role_RoleID] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Role] ([ID])
GO
ALTER TABLE [dbo].[AspNetUsers] CHECK CONSTRAINT [FK_dbo.AspNetUsers_dbo.Role_RoleID]
GO
ALTER TABLE [dbo].[Checkout_PayfortPaymentReq]  WITH CHECK ADD  CONSTRAINT [FK__Checkout___Check__00DF2177] FOREIGN KEY([CheckoutdetailsId])
REFERENCES [dbo].[CheckoutDetails] ([ReferenceId])
GO
ALTER TABLE [dbo].[Checkout_PayfortPaymentReq] CHECK CONSTRAINT [FK__Checkout___Check__00DF2177]
GO
ALTER TABLE [dbo].[Checkout_PayfortPaymentReq]  WITH CHECK ADD  CONSTRAINT [FK__Checkout___Payfo__01D345B0] FOREIGN KEY([PayfortPaymentRequestId])
REFERENCES [dbo].[PayfortPaymentRequest] ([ID])
GO
ALTER TABLE [dbo].[Checkout_PayfortPaymentReq] CHECK CONSTRAINT [FK__Checkout___Payfo__01D345B0]
GO
ALTER TABLE [dbo].[CheckoutAdditionalDrivers]  WITH CHECK ADD  CONSTRAINT [FK_CheckOutAdditionalDrivers_CheckoutDetails] FOREIGN KEY([CheckoutDetailsId])
REFERENCES [dbo].[CheckoutDetails] ([ReferenceId])
GO
ALTER TABLE [dbo].[CheckoutAdditionalDrivers] CHECK CONSTRAINT [FK_CheckOutAdditionalDrivers_CheckoutDetails]
GO
ALTER TABLE [dbo].[CheckoutAdditionalDrivers]  WITH CHECK ADD  CONSTRAINT [FK_CheckoutAdditionalDrivers_Driver] FOREIGN KEY([DriverId])
REFERENCES [dbo].[Driver] ([DriverId])
GO
ALTER TABLE [dbo].[CheckoutAdditionalDrivers] CHECK CONSTRAINT [FK_CheckoutAdditionalDrivers_Driver]
GO
ALTER TABLE [dbo].[CheckoutDetails]  WITH CHECK ADD  CONSTRAINT [FK_CheckoutDetails_CheckoutCarBackImage] FOREIGN KEY([ImageBackId])
REFERENCES [dbo].[CheckoutCarImages] ([ID])
GO
ALTER TABLE [dbo].[CheckoutDetails] CHECK CONSTRAINT [FK_CheckoutDetails_CheckoutCarBackImage]
GO
ALTER TABLE [dbo].[CheckoutDetails]  WITH CHECK ADD  CONSTRAINT [FK_CheckoutDetails_CheckoutCarBodyImage] FOREIGN KEY([ImageBodyId])
REFERENCES [dbo].[CheckoutCarImages] ([ID])
GO
ALTER TABLE [dbo].[CheckoutDetails] CHECK CONSTRAINT [FK_CheckoutDetails_CheckoutCarBodyImage]
GO
ALTER TABLE [dbo].[CheckoutDetails]  WITH CHECK ADD  CONSTRAINT [FK_CheckoutDetails_CheckoutCarFrontImage] FOREIGN KEY([ImageFrontId])
REFERENCES [dbo].[CheckoutCarImages] ([ID])
GO
ALTER TABLE [dbo].[CheckoutDetails] CHECK CONSTRAINT [FK_CheckoutDetails_CheckoutCarFrontImage]
GO
ALTER TABLE [dbo].[CheckoutDetails]  WITH CHECK ADD  CONSTRAINT [FK_CheckoutDetails_CheckoutCarLeftImage] FOREIGN KEY([ImageLeftId])
REFERENCES [dbo].[CheckoutCarImages] ([ID])
GO
ALTER TABLE [dbo].[CheckoutDetails] CHECK CONSTRAINT [FK_CheckoutDetails_CheckoutCarLeftImage]
GO
ALTER TABLE [dbo].[CheckoutDetails]  WITH CHECK ADD  CONSTRAINT [FK_CheckoutDetails_CheckoutCarRightImage] FOREIGN KEY([ImageRightId])
REFERENCES [dbo].[CheckoutCarImages] ([ID])
GO
ALTER TABLE [dbo].[CheckoutDetails] CHECK CONSTRAINT [FK_CheckoutDetails_CheckoutCarRightImage]
GO
ALTER TABLE [dbo].[CheckoutDetails]  WITH CHECK ADD  CONSTRAINT [FK_CheckoutDetails_MainDriver] FOREIGN KEY([MainDriverId])
REFERENCES [dbo].[Driver] ([DriverId])
GO
ALTER TABLE [dbo].[CheckoutDetails] CHECK CONSTRAINT [FK_CheckoutDetails_MainDriver]
GO
ALTER TABLE [dbo].[CheckoutDetails]  WITH CHECK ADD  CONSTRAINT [FK_CheckoutDetails_PaymentMethod] FOREIGN KEY([PaymentMethodCode])
REFERENCES [dbo].[PaymentMethod] ([Code])
GO
ALTER TABLE [dbo].[CheckoutDetails] CHECK CONSTRAINT [FK_CheckoutDetails_PaymentMethod]
GO
ALTER TABLE [dbo].[CheckoutDetails]  WITH CHECK ADD  CONSTRAINT [FK_CheckoutDetails_PolicyStatus] FOREIGN KEY([PolicyStatusId])
REFERENCES [dbo].[PolicyStatus] ([Id])
GO
ALTER TABLE [dbo].[CheckoutDetails] CHECK CONSTRAINT [FK_CheckoutDetails_PolicyStatus]
GO
ALTER TABLE [dbo].[CheckoutDetails]  WITH CHECK ADD  CONSTRAINT [FK_CheckoutDetails_Product] FOREIGN KEY([SelectedProductId])
REFERENCES [dbo].[Product] ([Id])
GO
ALTER TABLE [dbo].[CheckoutDetails] CHECK CONSTRAINT [FK_CheckoutDetails_Product]
GO
ALTER TABLE [dbo].[CheckoutDetails]  WITH CHECK ADD  CONSTRAINT [FK_CheckoutDetails_ProductType] FOREIGN KEY([SelectedInsuranceTypeCode])
REFERENCES [dbo].[ProductType] ([Code])
GO
ALTER TABLE [dbo].[CheckoutDetails] CHECK CONSTRAINT [FK_CheckoutDetails_ProductType]
GO
ALTER TABLE [dbo].[CheckoutDetails]  WITH CHECK ADD  CONSTRAINT [FK_CheckoutDetails_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[CheckoutDetails] CHECK CONSTRAINT [FK_CheckoutDetails_User]
GO
ALTER TABLE [dbo].[CheckoutDetails]  WITH CHECK ADD  CONSTRAINT [FK_CheckoutDetails_Vehicle] FOREIGN KEY([VehicleId])
REFERENCES [dbo].[Vehicles] ([ID])
GO
ALTER TABLE [dbo].[CheckoutDetails] CHECK CONSTRAINT [FK_CheckoutDetails_Vehicle]
GO
ALTER TABLE [dbo].[Deductible]  WITH CHECK ADD  CONSTRAINT [FK_Deductible_InsuranceCompany] FOREIGN KEY([InsuranceCompanyID])
REFERENCES [dbo].[InsuranceCompany] ([InsuranceCompanyID])
GO
ALTER TABLE [dbo].[Deductible] CHECK CONSTRAINT [FK_Deductible_InsuranceCompany]
GO
ALTER TABLE [dbo].[Driver]  WITH CHECK ADD  CONSTRAINT [FK__Driver__CityId__11158940] FOREIGN KEY([CityId])
REFERENCES [dbo].[City] ([Code])
GO
ALTER TABLE [dbo].[Driver] CHECK CONSTRAINT [FK__Driver__CityId__11158940]
GO
ALTER TABLE [dbo].[Driver]  WITH CHECK ADD  CONSTRAINT [FK__Driver__WorkCity__1209AD79] FOREIGN KEY([WorkCityId])
REFERENCES [dbo].[City] ([Code])
GO
ALTER TABLE [dbo].[Driver] CHECK CONSTRAINT [FK__Driver__WorkCity__1209AD79]
GO
ALTER TABLE [dbo].[DriverLicense]  WITH CHECK ADD  CONSTRAINT [FK_DriverLicense_Driver] FOREIGN KEY([DriverId])
REFERENCES [dbo].[Driver] ([DriverId])
GO
ALTER TABLE [dbo].[DriverLicense] CHECK CONSTRAINT [FK_DriverLicense_Driver]
GO
ALTER TABLE [dbo].[DriverLicense]  WITH CHECK ADD  CONSTRAINT [FK_DriverLicense_LicenseType] FOREIGN KEY([TypeDesc])
REFERENCES [dbo].[LicenseType] ([Code])
GO
ALTER TABLE [dbo].[DriverLicense] CHECK CONSTRAINT [FK_DriverLicense_LicenseType]
GO
ALTER TABLE [dbo].[DriverViolation]  WITH CHECK ADD  CONSTRAINT [FK__DriverVio__Drive__14E61A24] FOREIGN KEY([DriverId])
REFERENCES [dbo].[Driver] ([DriverId])
GO
ALTER TABLE [dbo].[DriverViolation] CHECK CONSTRAINT [FK__DriverVio__Drive__14E61A24]
GO
ALTER TABLE [dbo].[InsuaranceCompanyBenefit]  WITH CHECK ADD  CONSTRAINT [FK_InsuaranceCompanyBenefit_Benefit] FOREIGN KEY([BenefitCode])
REFERENCES [dbo].[Benefit] ([Code])
GO
ALTER TABLE [dbo].[InsuaranceCompanyBenefit] CHECK CONSTRAINT [FK_InsuaranceCompanyBenefit_Benefit]
GO
ALTER TABLE [dbo].[InsuaranceCompanyBenefit]  WITH CHECK ADD  CONSTRAINT [FK_InsuaranceCompanyBenefit_InsuaranceCompany] FOREIGN KEY([InsurnaceCompanyID])
REFERENCES [dbo].[InsuranceCompany] ([InsuranceCompanyID])
GO
ALTER TABLE [dbo].[InsuaranceCompanyBenefit] CHECK CONSTRAINT [FK_InsuaranceCompanyBenefit_InsuaranceCompany]
GO
ALTER TABLE [dbo].[InsuranceCompany]  WITH CHECK ADD  CONSTRAINT [FK_InsuranceCompany_Address] FOREIGN KEY([AddressId])
REFERENCES [dbo].[Address] ([Id])
GO
ALTER TABLE [dbo].[InsuranceCompany] CHECK CONSTRAINT [FK_InsuranceCompany_Address]
GO
ALTER TABLE [dbo].[InsuranceCompany]  WITH CHECK ADD  CONSTRAINT [FK_InsuranceCompany_Contact] FOREIGN KEY([ContactId])
REFERENCES [dbo].[Contact] ([Id])
GO
ALTER TABLE [dbo].[InsuranceCompany] CHECK CONSTRAINT [FK_InsuranceCompany_Contact]
GO
ALTER TABLE [dbo].[InsuranceCompanyProductTypeConfig]  WITH CHECK ADD  CONSTRAINT [FK_InsuranceCompanyProductTypeConfig_ProductType] FOREIGN KEY([ProductTypeCode])
REFERENCES [dbo].[ProductType] ([Code])
GO
ALTER TABLE [dbo].[InsuranceCompanyProductTypeConfig] CHECK CONSTRAINT [FK_InsuranceCompanyProductTypeConfig_ProductType]
GO
ALTER TABLE [dbo].[Insured]  WITH CHECK ADD  CONSTRAINT [FK__Insured__CityId__1A9EF37A] FOREIGN KEY([CityId])
REFERENCES [dbo].[City] ([Code])
GO
ALTER TABLE [dbo].[Insured] CHECK CONSTRAINT [FK__Insured__CityId__1A9EF37A]
GO
ALTER TABLE [dbo].[Insured]  WITH CHECK ADD  CONSTRAINT [FK__Insured__IdIssue__1B9317B3] FOREIGN KEY([IdIssueCityId])
REFERENCES [dbo].[City] ([Code])
GO
ALTER TABLE [dbo].[Insured] CHECK CONSTRAINT [FK__Insured__IdIssue__1B9317B3]
GO
ALTER TABLE [dbo].[Insured]  WITH CHECK ADD  CONSTRAINT [FK__Insured__WorkCit__1C873BEC] FOREIGN KEY([WorkCityId])
REFERENCES [dbo].[City] ([Code])
GO
ALTER TABLE [dbo].[Insured] CHECK CONSTRAINT [FK__Insured__WorkCit__1C873BEC]
GO
ALTER TABLE [dbo].[Invoice]  WITH CHECK ADD  CONSTRAINT [FK_Invoice_AspNetUsers] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[Invoice] CHECK CONSTRAINT [FK_Invoice_AspNetUsers]
GO
ALTER TABLE [dbo].[Invoice]  WITH CHECK ADD  CONSTRAINT [FK_Invoice_InsuranceCompany] FOREIGN KEY([InsuranceCompanyId])
REFERENCES [dbo].[InsuranceCompany] ([InsuranceCompanyID])
GO
ALTER TABLE [dbo].[Invoice] CHECK CONSTRAINT [FK_Invoice_InsuranceCompany]
GO
ALTER TABLE [dbo].[Invoice]  WITH CHECK ADD  CONSTRAINT [FK_Invoice_Policy] FOREIGN KEY([PolicyId])
REFERENCES [dbo].[Policy] ([Id])
GO
ALTER TABLE [dbo].[Invoice] CHECK CONSTRAINT [FK_Invoice_Policy]
GO
ALTER TABLE [dbo].[Invoice]  WITH CHECK ADD  CONSTRAINT [FK_Invoice_ProductType] FOREIGN KEY([InsuranceTypeCode])
REFERENCES [dbo].[ProductType] ([Code])
GO
ALTER TABLE [dbo].[Invoice] CHECK CONSTRAINT [FK_Invoice_ProductType]
GO
ALTER TABLE [dbo].[Invoice_Benefit]  WITH CHECK ADD  CONSTRAINT [FK_Invoice_Benefit_Benefit] FOREIGN KEY([BenefitId])
REFERENCES [dbo].[Benefit] ([Code])
GO
ALTER TABLE [dbo].[Invoice_Benefit] CHECK CONSTRAINT [FK_Invoice_Benefit_Benefit]
GO
ALTER TABLE [dbo].[Invoice_Benefit]  WITH CHECK ADD  CONSTRAINT [FK_Invoice_Benefit_Invoice] FOREIGN KEY([InvoiceId])
REFERENCES [dbo].[Invoice] ([Id])
GO
ALTER TABLE [dbo].[Invoice_Benefit] CHECK CONSTRAINT [FK_Invoice_Benefit_Invoice]
GO
ALTER TABLE [dbo].[InvoiceFile]  WITH CHECK ADD  CONSTRAINT [FK_InvoiceFile_Invoice] FOREIGN KEY([Id])
REFERENCES [dbo].[Invoice] ([Id])
GO
ALTER TABLE [dbo].[InvoiceFile] CHECK CONSTRAINT [FK_InvoiceFile_Invoice]
GO
ALTER TABLE [dbo].[NotificationParameter]  WITH CHECK ADD  CONSTRAINT [FK_NotificationParameter_Notification] FOREIGN KEY([NotificationId])
REFERENCES [dbo].[Notification] ([Id])
GO
ALTER TABLE [dbo].[NotificationParameter] CHECK CONSTRAINT [FK_NotificationParameter_Notification]
GO
ALTER TABLE [dbo].[PayfortPaymentResponse]  WITH CHECK ADD  CONSTRAINT [FK_PayfortPaymentResponse_PayfortPaymentRequests] FOREIGN KEY([RequestId])
REFERENCES [dbo].[PayfortPaymentRequest] ([ID])
GO
ALTER TABLE [dbo].[PayfortPaymentResponse] CHECK CONSTRAINT [FK_PayfortPaymentResponse_PayfortPaymentRequests]
GO
ALTER TABLE [dbo].[Policy]  WITH CHECK ADD  CONSTRAINT [FK_Policy_CheckOutDetails] FOREIGN KEY([CheckOutDetailsId])
REFERENCES [dbo].[CheckoutDetails] ([ReferenceId])
GO
ALTER TABLE [dbo].[Policy] CHECK CONSTRAINT [FK_Policy_CheckOutDetails]
GO
ALTER TABLE [dbo].[Policy]  WITH CHECK ADD  CONSTRAINT [FK_Policy_InsuranceCompany] FOREIGN KEY([InsuranceCompanyID])
REFERENCES [dbo].[InsuranceCompany] ([InsuranceCompanyID])
GO
ALTER TABLE [dbo].[Policy] CHECK CONSTRAINT [FK_Policy_InsuranceCompany]
GO
ALTER TABLE [dbo].[Policy]  WITH CHECK ADD  CONSTRAINT [FK_Policy_PolicyFile] FOREIGN KEY([PolicyFileId])
REFERENCES [dbo].[PolicyFile] ([ID])
GO
ALTER TABLE [dbo].[Policy] CHECK CONSTRAINT [FK_Policy_PolicyFile]
GO
ALTER TABLE [dbo].[PolicyDetails]  WITH CHECK ADD  CONSTRAINT [FK_PolicyDetails_Policy] FOREIGN KEY([Id])
REFERENCES [dbo].[Policy] ([Id])
GO
ALTER TABLE [dbo].[PolicyDetails] CHECK CONSTRAINT [FK_PolicyDetails_Policy]
GO
ALTER TABLE [dbo].[PolicyUpdatePayment]  WITH CHECK ADD  CONSTRAINT [FK__PolicyUpd__Polic__29E1370A] FOREIGN KEY([PolicyUpdateRequestId])
REFERENCES [dbo].[PolicyUpdateRequest] ([Id])
GO
ALTER TABLE [dbo].[PolicyUpdatePayment] CHECK CONSTRAINT [FK__PolicyUpd__Polic__29E1370A]
GO
ALTER TABLE [dbo].[PolicyUpdateRequest]  WITH CHECK ADD  CONSTRAINT [FK__PolicyUpd__Polic__2AD55B43] FOREIGN KEY([PolicyId])
REFERENCES [dbo].[Policy] ([Id])
GO
ALTER TABLE [dbo].[PolicyUpdateRequest] CHECK CONSTRAINT [FK__PolicyUpd__Polic__2AD55B43]
GO
ALTER TABLE [dbo].[PolicyUpdateRequestAttachment]  WITH CHECK ADD  CONSTRAINT [FK_PolicyUpdReqAttach_Attachment] FOREIGN KEY([AttachmentId])
REFERENCES [dbo].[Attachment] ([Id])
GO
ALTER TABLE [dbo].[PolicyUpdateRequestAttachment] CHECK CONSTRAINT [FK_PolicyUpdReqAttach_Attachment]
GO
ALTER TABLE [dbo].[PolicyUpdateRequestAttachment]  WITH CHECK ADD  CONSTRAINT [FK_PolicyUpdReqAttach_PolicyUpdReq] FOREIGN KEY([PolicyUpdReqId])
REFERENCES [dbo].[PolicyUpdateRequest] ([Id])
GO
ALTER TABLE [dbo].[PolicyUpdateRequestAttachment] CHECK CONSTRAINT [FK_PolicyUpdReqAttach_PolicyUpdReq]
GO
ALTER TABLE [dbo].[PolicyUpdReq_PayfortPaymentReq]  WITH CHECK ADD  CONSTRAINT [FK__PolicyUpd__Payfo__2DB1C7EE] FOREIGN KEY([PayfortPaymentRequestId])
REFERENCES [dbo].[PayfortPaymentRequest] ([ID])
GO
ALTER TABLE [dbo].[PolicyUpdReq_PayfortPaymentReq] CHECK CONSTRAINT [FK__PolicyUpd__Payfo__2DB1C7EE]
GO
ALTER TABLE [dbo].[PolicyUpdReq_PayfortPaymentReq]  WITH CHECK ADD  CONSTRAINT [FK__PolicyUpd__Polic__2EA5EC27] FOREIGN KEY([PolicyUpdateRequestId])
REFERENCES [dbo].[PolicyUpdateRequest] ([Id])
GO
ALTER TABLE [dbo].[PolicyUpdReq_PayfortPaymentReq] CHECK CONSTRAINT [FK__PolicyUpd__Polic__2EA5EC27]
GO
ALTER TABLE [dbo].[PriceDetail]  WITH CHECK ADD  CONSTRAINT [FK_PriceDetail_PriceType] FOREIGN KEY([PriceTypeCode])
REFERENCES [dbo].[PriceType] ([Code])
GO
ALTER TABLE [dbo].[PriceDetail] CHECK CONSTRAINT [FK_PriceDetail_PriceType]
GO
ALTER TABLE [dbo].[PriceDetail]  WITH CHECK ADD  CONSTRAINT [FK_PriceDetail_Product] FOREIGN KEY([ProductID])
REFERENCES [dbo].[Product] ([Id])
GO
ALTER TABLE [dbo].[PriceDetail] CHECK CONSTRAINT [FK_PriceDetail_Product]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_InsuranceCompany] FOREIGN KEY([ProviderId])
REFERENCES [dbo].[InsuranceCompany] ([InsuranceCompanyID])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_InsuranceCompany]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_QuotationResponse] FOREIGN KEY([QuotationResponseId])
REFERENCES [dbo].[QuotationResponse] ([Id])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_QuotationResponse]
GO
ALTER TABLE [dbo].[Product_Benefit]  WITH CHECK ADD  CONSTRAINT [FK_Product_Benefit_Benefit] FOREIGN KEY([BenefitId])
REFERENCES [dbo].[Benefit] ([Code])
GO
ALTER TABLE [dbo].[Product_Benefit] CHECK CONSTRAINT [FK_Product_Benefit_Benefit]
GO
ALTER TABLE [dbo].[Product_Benefit]  WITH CHECK ADD  CONSTRAINT [FK_Product_Benefit_Product] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Product] ([Id])
GO
ALTER TABLE [dbo].[Product_Benefit] CHECK CONSTRAINT [FK_Product_Benefit_Product]
GO
ALTER TABLE [dbo].[QuotationRequest]  WITH CHECK ADD  CONSTRAINT [FK__Quotation__Insur__3552E9B6] FOREIGN KEY([InsuredId])
REFERENCES [dbo].[Insured] ([Id])
GO
ALTER TABLE [dbo].[QuotationRequest] CHECK CONSTRAINT [FK__Quotation__Insur__3552E9B6]
GO
ALTER TABLE [dbo].[QuotationRequest]  WITH CHECK ADD  CONSTRAINT [FK_QuotationRequest_AspNetUsers] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[QuotationRequest] CHECK CONSTRAINT [FK_QuotationRequest_AspNetUsers]
GO
ALTER TABLE [dbo].[QuotationRequest]  WITH CHECK ADD  CONSTRAINT [FK_QuotationRequest_City] FOREIGN KEY([CityCode])
REFERENCES [dbo].[City] ([Code])
GO
ALTER TABLE [dbo].[QuotationRequest] CHECK CONSTRAINT [FK_QuotationRequest_City]
GO
ALTER TABLE [dbo].[QuotationRequest]  WITH CHECK ADD  CONSTRAINT [FK_QuotationRequest_Driver] FOREIGN KEY([MainDriverId])
REFERENCES [dbo].[Driver] ([DriverId])
GO
ALTER TABLE [dbo].[QuotationRequest] CHECK CONSTRAINT [FK_QuotationRequest_Driver]
GO
ALTER TABLE [dbo].[QuotationRequest]  WITH CHECK ADD  CONSTRAINT [FK_QuotationRequest_Vehicles] FOREIGN KEY([VehicleId])
REFERENCES [dbo].[Vehicles] ([ID])
GO
ALTER TABLE [dbo].[QuotationRequest] CHECK CONSTRAINT [FK_QuotationRequest_Vehicles]
GO
ALTER TABLE [dbo].[QuotationRequestAdditionalDrivers]  WITH CHECK ADD  CONSTRAINT [FK_QuotationRequestAdditionalDrivers_Driver] FOREIGN KEY([AdditionalDriverId])
REFERENCES [dbo].[Driver] ([DriverId])
GO
ALTER TABLE [dbo].[QuotationRequestAdditionalDrivers] CHECK CONSTRAINT [FK_QuotationRequestAdditionalDrivers_Driver]
GO
ALTER TABLE [dbo].[QuotationRequestAdditionalDrivers]  WITH CHECK ADD  CONSTRAINT [FK_QuotationRequestAdditionalDrivers_QuotationRequest] FOREIGN KEY([QuotationRequestId])
REFERENCES [dbo].[QuotationRequest] ([ID])
GO
ALTER TABLE [dbo].[QuotationRequestAdditionalDrivers] CHECK CONSTRAINT [FK_QuotationRequestAdditionalDrivers_QuotationRequest]
GO
ALTER TABLE [dbo].[QuotationResponse]  WITH CHECK ADD  CONSTRAINT [FK_QuotationResponse_InsuranceCompany] FOREIGN KEY([InsuranceCompanyId])
REFERENCES [dbo].[InsuranceCompany] ([InsuranceCompanyID])
GO
ALTER TABLE [dbo].[QuotationResponse] CHECK CONSTRAINT [FK_QuotationResponse_InsuranceCompany]
GO
ALTER TABLE [dbo].[QuotationResponse]  WITH CHECK ADD  CONSTRAINT [FK_QuotationResponse_ProductType] FOREIGN KEY([InsuranceTypeCode])
REFERENCES [dbo].[ProductType] ([Code])
GO
ALTER TABLE [dbo].[QuotationResponse] CHECK CONSTRAINT [FK_QuotationResponse_ProductType]
GO
ALTER TABLE [dbo].[QuotationResponse]  WITH CHECK ADD  CONSTRAINT [FK_QuotationResponse_QuotationRequest] FOREIGN KEY([RequestId])
REFERENCES [dbo].[QuotationRequest] ([ID])
GO
ALTER TABLE [dbo].[QuotationResponse] CHECK CONSTRAINT [FK_QuotationResponse_QuotationRequest]
GO
ALTER TABLE [dbo].[Role]  WITH CHECK ADD  CONSTRAINT [FK_Role_RoleType] FOREIGN KEY([RoleTypeID])
REFERENCES [dbo].[RoleType] ([ID])
GO
ALTER TABLE [dbo].[Role] CHECK CONSTRAINT [FK_Role_RoleType]
GO
ALTER TABLE [dbo].[SadadNotificationResponse]  WITH CHECK ADD  CONSTRAINT [FK_SadadNotificationResponse_SadadNotificationMessage] FOREIGN KEY([NotificationMessageId])
REFERENCES [dbo].[SadadNotificationMessage] ([ID])
GO
ALTER TABLE [dbo].[SadadNotificationResponse] CHECK CONSTRAINT [FK_SadadNotificationResponse_SadadNotificationMessage]
GO
ALTER TABLE [dbo].[SadadResponses]  WITH CHECK ADD  CONSTRAINT [FK_SadadResponses_SadadRequests] FOREIGN KEY([SadadRequestId])
REFERENCES [dbo].[SadadRequests] ([ID])
GO
ALTER TABLE [dbo].[SadadResponses] CHECK CONSTRAINT [FK_SadadResponses_SadadRequests]
GO
ALTER TABLE [dbo].[ShoppingCartItem]  WITH CHECK ADD  CONSTRAINT [ShoppingCartItem_Product] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Product] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ShoppingCartItem] CHECK CONSTRAINT [ShoppingCartItem_Product]
GO
ALTER TABLE [dbo].[ShoppingCartItemBenefit]  WITH CHECK ADD  CONSTRAINT [ShoppingCartItemBenefit_ProductBenefit] FOREIGN KEY([ProductBenefitId])
REFERENCES [dbo].[Product_Benefit] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ShoppingCartItemBenefit] CHECK CONSTRAINT [ShoppingCartItemBenefit_ProductBenefit]
GO
ALTER TABLE [dbo].[Vehicle_VehicleSpecification]  WITH CHECK ADD  CONSTRAINT [FK__Vehicle_V__Vehic__43A1090D] FOREIGN KEY([VehicleId])
REFERENCES [dbo].[Vehicles] ([ID])
GO
ALTER TABLE [dbo].[Vehicle_VehicleSpecification] CHECK CONSTRAINT [FK__Vehicle_V__Vehic__43A1090D]
GO
ALTER TABLE [dbo].[Vehicle_VehicleSpecification]  WITH CHECK ADD  CONSTRAINT [FK__Vehicle_V__Vehic__44952D46] FOREIGN KEY([VehicleSpecificationId])
REFERENCES [dbo].[VehicleSpecification] ([Id])
GO
ALTER TABLE [dbo].[Vehicle_VehicleSpecification] CHECK CONSTRAINT [FK__Vehicle_V__Vehic__44952D46]
GO
ALTER TABLE [dbo].[VehicleModel]  WITH CHECK ADD  CONSTRAINT [FK_VehicleModel_VehicleMaker] FOREIGN KEY([VehicleMakerCode])
REFERENCES [dbo].[VehicleMaker] ([Code])
GO
ALTER TABLE [dbo].[VehicleModel] CHECK CONSTRAINT [FK_VehicleModel_VehicleMaker]
GO
ALTER TABLE [dbo].[Vehicles]  WITH CHECK ADD  CONSTRAINT [FK_Vehicles_VehicleBody] FOREIGN KEY([VehicleBodyCode])
REFERENCES [dbo].[VehicleBodyType] ([Code])
GO
ALTER TABLE [dbo].[Vehicles] CHECK CONSTRAINT [FK_Vehicles_VehicleBody]
GO
ALTER TABLE [dbo].[Vehicles]  WITH CHECK ADD  CONSTRAINT [FK_Vehicles_VehiclePlateType] FOREIGN KEY([PlateTypeCode])
REFERENCES [dbo].[VehiclePlateType] ([Code])
GO
ALTER TABLE [dbo].[Vehicles] CHECK CONSTRAINT [FK_Vehicles_VehiclePlateType]
GO

