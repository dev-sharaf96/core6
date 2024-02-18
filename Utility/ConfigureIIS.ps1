# IIS Configuration
#
# Prerequisites:
# Set-ExecutionPolicy RemoteSigned
# Import-Module WebAdministation (or ability to execute)
# If using server try Import-Module ServerManager
#
# PowerShell gotchas:
# String interpolation only works in double quotes "var: $good", not single quotes '$bad'
# WebAdministration will not accept / or \ path delimiters, you MUST pass the correct one
# Cannot use PowerShell to set ASP.NET Impersonation on a workstation, thanks SO MUCH for that
# Set-ItemProperty parameters like applicationPool are case sensitive
#
$projectName = "Tameenk"
#$appPool = ".NET v4.5 Classic" 
#Three web application folders are inside this location
$sandbox = "D:\neomportal"
#$website = "Default Web Site"
$clean = $false

$anonAuthFilter = "/system.WebServer/security/authentication/AnonymousAuthentication"
$windowsAuthFilter = "/system.WebServer/security/authentication/windowsAuthentication"
$basicAuthFilter = "/system.webServer/security/authentication/basicAuthentication"


if ((Get-Module "WebAdministration" -ErrorAction SilentlyContinue) -eq $null){
	Import-Module WebAdministration
}
#Servers Only
#if ((Get-Module "ServerManager" -ErrorAction SilentlyContinue) -eq $null) {
#	Import-Module ServerManager
#}
function Create-Website( [string]$website, [string]$path, [int]$port, [string]$appPool) {
	if ( (Test-Path "IIS:\Sites\$website") -eq $false ) {
		$physicalPath = if( $path -eq "" ) { $sandbox } else { "$sandbox\$path" }
		Write-Host "Physical Path: $physicalPath"
		New-WebSite -Name $website -Port $port -PhysicalPath $physicalPath -ApplicationPool $appPool
		Write-Host "$website created"
		#IIS:\>New-WebApplication -Name testApp -Site 'Default Web Site' -PhysicalPath c:\test -ApplicationPool DefaultAppPool
	} else {
		Write-Host "$website already exists"
	}
}
function Create-Application( [string]$appName, [string]$path ) {
	if ( (Test-Path "IIS:\Sites\$website\$appName") -eq $false ) {
		$physicalPath = if( $path -eq "" ) { $sandbox } else { "$sandbox\$path" }
		Write-Host "Physical Path: $physicalPath"
		New-Item "IIS:\Sites\$website\$appName" -type Application -physicalpath $physicalPath
		Write-Host "$appName created"
		#IIS:\>New-WebApplication -Name testApp -Site 'Default Web Site' -PhysicalPath c:\test -ApplicationPool DefaultAppPool
	} else {
		Write-Host "$appName already exists"
	}
}

function Create-AppPool([string]$appPool){
    if ( (Test-Path "IIS:\apppools\$appPool") -eq $false ) {
        New-WebAppPool $appPool
    $is64BitOS = [Environment]::Is64BitOperatingSystem
    
    if( $is64BitOS ) {
    	Write-Host "64 Bit OS, Check/Set Enable 32 bit Applications"
    
    	$enable32Bit = "enable32BitAppOnWin64"
    	$32BitAppsEnabled = Get-ItemProperty "IIS:\apppools\$appPool" -Name $enable32Bit
    	if ( $32BitAppsEnabled.Value -eq $False ) {
    		Write-Host "Enabling 32 bit Applications"
    		Set-ItemProperty "IIS:\apppools\$appPool" -Name $enable32Bit -Value "True"
    	}
    	$32BitAppsEnabled = Get-ItemProperty "IIS:\apppools\$appPool" -Name $enable32Bit
    	Write-Host "32 bit applications are Enabled: $($32BitAppsEnabled.Value)"
    } else {
    	Write-Host "32 bit OS"
    }
    } else{
        Write-Host "App pool $appPool already exists"
        }
}

function Remove-Application( [string]$appName ) {
	if ( (Test-Path "IIS:\Sites\$website\$appName") -eq $true ) {
		Remove-Item "IIS:\Sites\$website\$appName" -recurse
		Write-Host "$appName removed"
		#IIS:\>Remove-WebApplication -Name TestApp -Site "Default Web Site"
	}
}

function Set-AppPool( [string]$appName ) {
	$webApp = Get-ItemProperty "IIS:\Sites\$website\$appName"
	if( $webApp.applicationPool -eq $appPool ){
		Write-Host "$appName Application Pools is already $appPool"
	} else {
		Set-ItemProperty "IIS:\Sites\$website\$appName" applicationPool $appPool
		Write-Host "Set $appName to Application Pool $appPool"
	}
}

function Set-AnonymousAuthentication( [string]$appName, [bool]$value ) {
	$anonAuth = Get-WebConfigurationProperty -filter $anonAuthFilter -name Enabled -location "$website/$appName"
	if( $anonAuth.Value -eq $value ){
		Write-Host "$appName Anonymous Authentication is already $value"
	} else {
		Set-WebConfigurationProperty -filter $anonAuthFilter -name Enabled -value $value -location "$website/$appName"
		Write-Host "Anonymous Authentication now $value on $appName"
	}
}

function Enable-WindowsAuthentication( [string]$appName ) {
	Set-WebConfigurationProperty -filter $windowsAuthFilter -name Enabled -value $true -location "$website/$appName"
}

function Enable-FormsAuthentication( [string]$appName ) {
	$config = (Get-WebConfiguration system.web/authentication "IIS:Sites\$website\$appName")
	$config.mode = "Forms"
	$config | Set-WebConfiguration system.web/authentication
}

function Enable-AspNetImpersonation( [string]$appName ){

# On a Server with ServerManager loaded, Set-WebConfigurationProperty may work
# Since this script runs on a workstation, resort to shelling out to appcmd, as
# it can handle the transacted call.  Otherwise the properties are read only
#	Set-WebConfigurationProperty -filter system.web/identity -name impersonate -value $true -location "$website/$appName" 	

	$aspNetImpersonation = Get-WebConfigurationProperty -filter system.web/identity -name impersonate -location "$website/$appName"
	if( $aspNetImpersonation.Value -eq $true ){
		Write-Host "ASP.NET Impersonation is already enabled"
	} else {
		$appCmdFilePath = "$Env:SystemRoot\System32\inetsrv\appcmd.exe"
& $appCmdFilePath set config "$website/$appname" -section:system.web/identity /impersonate:"True" 
	}
}

Write-Host "Setting up $projectName IIS Settings"

if( $clean -eq $true ){
	Write-Host "Clean Enabled, removing Web Applications"
	Remove-Application "WebApp/WebSecurity"
	Remove-Application "WebApp"
	Remove-Application "WebServices"
}

Create-AppPool "Tameenk.Web"
Create-Website "Tameenk.Web" "Tameenk" 7000 "Tameenk.Web"


Create-AppPool "Tameenk.QuotationApi"
Create-Website "Tameenk.QuotationApi" "Services\Quotation\Tameenk.Services.QuotationApi" 7001 "Tameenk.QuotationApi"


Create-AppPool "Tameenk.PolicyApi"
Create-Website "Tameenk.PolicyApi" "Services\Policy\Tameenk.Services.PolicyApi" 7002 "Tameenk.PolicyApi"


Create-AppPool "Tameenk.InquiryApi"
Create-Website "Tameenk.InquiryApi" "Services\Inquiry\Tameenk.Services.InquiryGateway" 7003 "Tameenk.InquiryApi"


Create-AppPool "Tameenk.AdministrationApi"
Create-Website "Tameenk.AdministrationApi" "Services\\Administration\Tameenk.Services.AdministrationApi" 7005 "Tameenk.AdministrationApi"


Create-AppPool "Tameenk.YakeenIntegrationApi"
Create-Website "Tameenk.YakeenIntegrationApi" "Services\Inquiry\Tameenk.Services.YakeenIntegrationApi" 7006 "Tameenk.YakeenIntegrationApi"

#Services\Identity\Tameenk.Services.IdentityApi


Create-AppPool "Tameenk.IdentityApi"
Create-Website "Tameenk.IdentityApi" "Services\Identity\Tameenk.Services.IdentityApi" 7010 "Tameenk.IdentityApi"

#$is64BitOS = [Environment]::Is64BitOperatingSystem
#
#if( $is64BitOS ) {
#	Write-Host "64 Bit OS, Check/Set Enable 32 bit Applications"
#
#	$enable32Bit = "enable32BitAppOnWin64"
#	$32BitAppsEnabled = Get-ItemProperty "IIS:\apppools\$appPool" -Name $enable32Bit
#	if ( $32BitAppsEnabled.Value -eq $False ) {
#		Write-Host "Enabling 32 bit Applications"
#		Set-ItemProperty "IIS:\apppools\$appPool" -Name $enable32Bit -Value "True"
#	}
#	$32BitAppsEnabled = Get-ItemProperty "IIS:\apppools\$appPool" -Name $enable32Bit
#	Write-Host "32 bit applications are Enabled: $($32BitAppsEnabled.Value)"
#} else {
#	Write-Host "32 bit OS"
#}



# Create WebApp
#Create-Application "Tameenk" "Tameenk"
#Set-AppPool "WebApp"

# Create WebServices
#Create-Application "WebServices" "Services"
#Set-AppPool "WebServices"
#Set-AnonymousAuthentication "WebServices" $true

# Create WebApp
#Create-Application "WebApp" "Web"
#Set-AppPool "WebApp"
#Enable-FormsAuthentication "WebApp"

# Create WebSecurity
# This Web Application is inside another one, be careful with the
# kind of slashes
#Create-Application "WebApp\WebSecurity" "Web\WebAuthentication"
#Set-AppPool "WebApp\WebSecurity"
#Set-AnonymousAuthentication "WebApp/WebSecurity" $false
#Enable-WindowsAuthentication "WebApp/WebSecurity"
#Enable-AspNetImpersonation "WebApp/WebSecurity"

Write-Host "IIS Setup Complete"