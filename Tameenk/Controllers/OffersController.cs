﻿using Newtonsoft.Json;
using Tameenk.Models;
            {
                Captcha = GetCaptcha()
            LanguageTwoLetterIsoCode language = LanguageTwoLetterIsoCode.Ar;
            if (model.Captcha == null)
        }



        #region captcha
            //image stream 
            string img = null;
                //gfx.FillRectangle(Brushes.White, new Rectangle(0, 0, bmp.Width, bmp.Height));
                var assembly = Assembly.GetExecutingAssembly();
                //var resourceName = "MyCompany.MyProduct.MyFile.txt";
                using (Stream stream = assembly.GetManifestResourceStream($"Tameenk.Captcha.captcha{GetRandomNumber(1, 10)}.jpg"))
                //add noise 
                if (noisy)

                //render as Jpeg 
                bmp.Save(mem, System.Drawing.Imaging.ImageFormat.Jpeg);
            {



        #endregion

    }