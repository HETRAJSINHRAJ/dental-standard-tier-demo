# Vercel Deployment Quick Reference

## 🚀 Quick Deploy Commands

### Deploy Patient System
```bash
# Using Vercel CLI
vercel --prod --env NEXT_PUBLIC_DEPLOYMENT_TYPE=PATIENT
```

### Deploy Admin Panel
```bash
# Using Vercel CLI
vercel --prod --env NEXT_PUBLIC_DEPLOYMENT_TYPE=ADMIN
```

---

## 📦 Vercel Project Configuration

### Patient Deployment (`smile-dental-patient`)

**Build Settings:**
- Framework Preset: `Next.js`
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

**Environment Variables:**
```
NEXT_PUBLIC_DEPLOYMENT_TYPE=PATIENT
NEXT_PUBLIC_FIREBASE_API_KEY=<your-value>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-value>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-value>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-value>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-value>
NEXT_PUBLIC_FIREBASE_APP_ID=<your-value>
```

**Domains:**
- Production: `www.smiledental.com`
- Preview: `smile-dental-patient.vercel.app`

---

### Admin Deployment (`smile-dental-admin`)

**Build Settings:**
- Framework Preset: `Next.js`
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

**Environment Variables:**
```
NEXT_PUBLIC_DEPLOYMENT_TYPE=ADMIN
NEXT_PUBLIC_FIREBASE_API_KEY=<your-value>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-value>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-value>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-value>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-value>
NEXT_PUBLIC_FIREBASE_APP_ID=<your-value>
FIREBASE_ADMIN_PROJECT_ID=<your-value>
FIREBASE_ADMIN_CLIENT_EMAIL=<your-value>
FIREBASE_ADMIN_PRIVATE_KEY=<your-value>
```

**Domains:**
- Production: `admin.smiledental.com`
- Preview: `smile-dental-admin.vercel.app`

---

## 🔧 Vercel CLI Setup

### Install Vercel CLI
```bash
npm install -g vercel
```

### Login to Vercel
```bash
vercel login
```

### Link Project (First Time)
```bash
# For patient deployment
vercel link --project=smile-dental-patient

# For admin deployment
vercel link --project=smile-dental-admin
```

---

## 🌐 DNS Configuration

### For `www.smiledental.com` (Patient)

Add these DNS records to your domain provider:

**CNAME Record:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**A Record (Alternative):**
```
Type: A
Name: www
Value: 76.76.21.21
TTL: 3600
```

### For `admin.smiledental.com` (Admin)

**CNAME Record:**
```
Type: CNAME
Name: admin
Value: cname.vercel-dns.com
TTL: 3600
```

**A Record (Alternative):**
```
Type: A
Name: admin
Value: 76.76.21.21
TTL: 3600
```

---

## 🔄 Deployment Workflow

### Automatic Deployments (Recommended)

1. **Push to Git**
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```

2. **Vercel Auto-Deploys**
   - Both projects automatically rebuild
   - Preview deployments for pull requests
   - Production deployments for main branch

### Manual Deployments

1. **Deploy Patient System**
   ```bash
   vercel --prod --scope=your-team --project=smile-dental-patient
   ```

2. **Deploy Admin Panel**
   ```bash
   vercel --prod --scope=your-team --project=smile-dental-admin
   ```

---

## 📊 Monitoring & Analytics

### Vercel Dashboard

**Patient Deployment:**
- URL: `https://vercel.com/your-team/smile-dental-patient`
- Monitor: Traffic, Build times, Errors

**Admin Deployment:**
- URL: `https://vercel.com/your-team/smile-dental-admin`
- Monitor: Traffic, Build times, Errors

### Key Metrics to Watch

- **Build Duration**: Should be < 2 minutes
- **Response Time**: Should be < 500ms
- **Error Rate**: Should be < 1%
- **Bandwidth Usage**: Monitor for cost optimization

---

## 🐛 Common Issues & Solutions

### Issue: Build Fails

**Check:**
1. Environment variables are set correctly
2. `NEXT_PUBLIC_DEPLOYMENT_TYPE` is set
3. All dependencies are in `package.json`

**Solution:**
```bash
# Test build locally
npm run build

# Check logs in Vercel dashboard
```

### Issue: Environment Variables Not Working

**Solution:**
1. Go to Vercel project settings
2. Navigate to "Environment Variables"
3. Ensure variables are set for "Production" environment
4. Redeploy the project

### Issue: Domain Not Working

**Solution:**
1. Check DNS propagation: `https://dnschecker.org`
2. Verify domain is added in Vercel project settings
3. Check SSL certificate status
4. Wait up to 48 hours for DNS propagation

### Issue: 404 on Valid Routes

**Solution:**
1. Check `NEXT_PUBLIC_DEPLOYMENT_TYPE` is correct
2. Verify route is in allowed routes list
3. Check middleware configuration
4. Clear Vercel cache and redeploy

---

## 🔐 Security Best Practices

### Environment Variables

- ✅ Never commit `.env.local` to Git
- ✅ Use Vercel's encrypted environment variables
- ✅ Rotate Firebase keys periodically
- ✅ Use different Firebase projects for staging/production

### Access Control

- ✅ Limit Vercel team access
- ✅ Enable 2FA on Vercel account
- ✅ Use deployment protection for production
- ✅ Review deployment logs regularly

---

## 📈 Performance Optimization

### Vercel Configuration

Create `vercel.json` in project root:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "rewrites": []
}
```

### Caching Strategy

- Static assets: Cached for 1 year
- API routes: No cache
- Pages: ISR (Incremental Static Regeneration)

---

## 🎯 Deployment Checklist

### Before First Deployment

- [ ] Firebase project configured
- [ ] Environment variables prepared
- [ ] Domains purchased and ready
- [ ] Vercel account created
- [ ] Git repository pushed

### Patient Deployment

- [ ] Create Vercel project
- [ ] Set `DEPLOYMENT_TYPE=PATIENT`
- [ ] Configure all Firebase env vars
- [ ] Add custom domain
- [ ] Configure DNS
- [ ] Test deployment
- [ ] Verify SSL certificate

### Admin Deployment

- [ ] Create Vercel project
- [ ] Set `DEPLOYMENT_TYPE=ADMIN`
- [ ] Configure all Firebase env vars
- [ ] Add Firebase Admin SDK vars
- [ ] Add custom domain
- [ ] Configure DNS
- [ ] Test deployment
- [ ] Verify SSL certificate

### Post-Deployment

- [ ] Test patient booking flow
- [ ] Test admin login
- [ ] Verify Firebase authentication
- [ ] Check Firestore security rules
- [ ] Monitor error logs
- [ ] Set up alerts
- [ ] Document deployment process

---

## 📞 Support Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Firebase Documentation**: https://firebase.google.com/docs
- **Vercel Support**: https://vercel.com/support

---

## 🎉 Success Indicators

Your deployment is successful when:

✅ Patient site loads at `www.smiledental.com`  
✅ Admin panel loads at `admin.smiledental.com`  
✅ Both sites have valid SSL certificates  
✅ Firebase authentication works on both domains  
✅ Patient routes return 404 on admin deployment  
✅ Admin routes return 404 on patient deployment  
✅ No console errors on either deployment  
✅ Build times are reasonable (< 2 minutes)  
✅ Response times are fast (< 500ms)  

---

**Need Help?** Check the main [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

