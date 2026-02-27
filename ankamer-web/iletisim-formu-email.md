# İletişim Formu – E-posta Gönderimi

Form mesajları **Resend** ile admin e-posta adresinize gönderilir.

## Kurulum

1. [resend.com](https://resend.com) üzerinden ücretsiz hesap açın.
2. **API Keys** bölümünden bir API key oluşturun.
3. `.env` dosyasına ekleyin:
   - `ADMIN_EMAIL`: Mesajların gideceği e-posta (örn. `info@ankamergranit.com`)
   - `RESEND_API_KEY`: Resend'den aldığınız API key

## Resend test modu

Domain doğrulamadan Resend **sadece hesabınıza kayıtlı e-posta adresine** (Resend'e giriş yaptığınız e-posta) gönderim yapar. Bu yüzden:

- **Test için:** `ADMIN_EMAIL` değerini Resend hesabınızdaki e-posta ile **aynı** yapın (örn. `kutayozkoc99@gmail.com`).
- **Canlı kullanım:** [resend.com/domains](https://resend.com/domains) üzerinden domain doğrulayın; ardından `CONTACT_FROM_EMAIL` ile gönderen adresini bu domain'den verin. Sonrasında `ADMIN_EMAIL` olarak istediğiniz adresi kullanabilirsiniz.
