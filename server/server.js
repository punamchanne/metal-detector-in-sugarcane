```javascript
const app = require('./src/app');

// For Vercel Serverless
module.exports = app;

// Only listen if the file is run directly (Render/Local), not when imported (Vercel)
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${ PORT } `);
    });
}
```
