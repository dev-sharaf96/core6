﻿using System.Text.RegularExpressions;
using Tamkeen.Utilities;

namespace Tameeenk.Models
{
    public class CarPlateInfo
    {
        public readonly string PlateText1;
        public readonly string PlateText2;
        public readonly string PlateText3;
        public readonly int PlateNumber;
        public readonly string CarPlateNumberEn;
        public readonly string CarPlateNumberAr;

        private string _carPlateTextAr;
        public string CarPlateTextAr
        {
            get
            {
                if (string.IsNullOrEmpty(_carPlateTextAr))
                {
                    handleCarPlateText();
                }
                return _carPlateTextAr;
            }
        }

        private string _carPlateTextEn;
        public string CarPlateTextEn
        {
            get
            {
                if (string.IsNullOrEmpty(_carPlateTextEn))
                {
                    handleCarPlateText();
                }
                return _carPlateTextEn;
            }
        }

        

        public CarPlateInfo(string plateText1, string plateText2, string plateText3, int plateNumber)
        {
            PlateText1 = plateText1;
            PlateText2 = plateText2;
            PlateText3 = plateText3;
            PlateNumber = plateNumber;
            CarPlateNumberEn = plateNumber.ToString();
            CarPlateNumberAr = CarPlateUtils.ConvertCarPlateTextFromEnglishToArabic(CarPlateNumberEn, false);

            handleCarPlateText();
        }

        private void handleCarPlateText()
        {
            string carPlateText = PlateText1 + " " + PlateText2 + " " + PlateText3;
            if (Regex.IsMatch(carPlateText, "[\u0600-\u06ff\\s]+"))
            {
                _carPlateTextAr = carPlateText;
                _carPlateTextEn = CarPlateUtils.ConvertCarPlateTextFromArabicToEnglish(_carPlateTextAr, false);
                _carPlateTextAr = PlateText3 + " " + PlateText2 + " " + PlateText1;
            }
            else
            {
                _carPlateTextEn = carPlateText;
                _carPlateTextAr = CarPlateUtils.ConvertCarPlateTextFromEnglishToArabic(_carPlateTextEn, false);
            }
        }
    }
}