const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const { specs, swaggerUi } = require('../config/swagger.config');

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome endpoint
 *     description: Basic welcome message for the API
 *     tags: [General]
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "hello world 10"
 */
router.get('/', (req, res) => {
    res.json({ message: 'hello world 10' });
});

/**
 * @swagger
 * /nodemon:
 *   get:
 *     summary: Nodemon test endpoint
 *     description: Test endpoint to verify nodemon auto-restart functionality
 *     tags: [General]
 *     responses:
 *       200:
 *         description: Nodemon test response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "nodemon test"
 */
router.get('/nodemon', (req, res) => {
    res.json({ message: 'nodemon test' });
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Check the health status of the API service
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 */
router.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        message: 'Connected'
    });
});

/**
 * @swagger
 * /test-db:
 *   get:
 *     summary: Database connectivity test
 *     description: Test the connection to the Microsoft SQL Server database
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Database connection successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Database connection successful"
 *                 data:
 *                   type: object
 *                   description: "Database query result"
 *       500:
 *         description: Database connection failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/test-db', async (req, res) => {
    try {
        const { pool, poolConnect } = require('../config/db.config');
        await poolConnect;
        const result = await pool.request().query('SELECT 1');
        res.json({ 
            message: 'Database connection successful',
            data: result.recordset[0]
        });
    } catch (err) {
        console.error('Database test failed:', err);
        res.status(500).json({ 
            message: 'Database connection failed',
            error: err.message
        });
    }
});

// Swagger documentation
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Express SQL API Documentation'
}));

// User routes
router.use('/users', userRoutes);

module.exports = router; 