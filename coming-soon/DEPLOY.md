# نشر صفحة "قريباً" على aljeed.sa

الصفحة مستقلة تماماً (ملف `index.html` + مجلد `assets/`) ولا تعتمد على باقي ملفات المستودع.

## النشر (على السيرفر)

```bash
cd /var/www/aljeed-shuhnaty
TS=$(date +%Y%m%d_%H%M%S)

# 1) نسخة احتياطية كاملة من الموقع الحالي (لا تُحذف)
mv website website.bak-$TS

# 2) ضع محتويات مجلد coming-soon/ (index.html و assets/) في مجلد website جديد
mkdir website
#   مثال من جهازك:  scp -r coming-soon/index.html coming-soon/assets root@SERVER:/var/www/aljeed-shuhnaty/website/
rm -f website/DEPLOY.md

# 3) نفس صلاحيات المجلد القديم
chown -R --reference=website.bak-$TS website
chmod -R u=rwX,go=rX website
```

لا يلزم تعديل إعدادات nginx ولا إعادة تشغيله، لأن المسار نفسه لم يتغير.

## التحقق
```bash
curl -s https://aljeed.sa/ | grep -o '<title>.*</title>'
curl -sI https://app.aljeed.sa/ | head -1   # يجب ألا يتأثر
```

## التراجع
```bash
cd /var/www/aljeed-shuhnaty
mv website website.coming-soon-$(date +%Y%m%d_%H%M%S)
mv website.bak-<TS> website
```
