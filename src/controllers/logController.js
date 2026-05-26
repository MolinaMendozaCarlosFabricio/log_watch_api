import { pool } from '../config/db.js';

export const getLogs = async (req, res) => {

    try {

        const [logs] = await pool.query(
            'SELECT * FROM security_log ORDER BY date DESC'
        );

        res.json(logs);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const createLog = async (req, res) => {

    try {

        const {
            title,
            description,
            severity,
            ipv4_address,
            status
        } = req.body;

        await pool.query(
            `
            INSERT INTO security_log
            (title, description, severity, ipv4_address, status)
            VALUES (?, ?, ?, ?, ?)
            `,
            [
                title,
                description,
                severity,
                ipv4_address,
                status
            ]
        );

        res.status(201).json({
            message: 'Log creado correctamente'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const updateLog = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            title,
            description,
            severity,
            ipv4_address,
            status
        } = req.body;

        await pool.query(
            `
            UPDATE security_log
            SET
                title = ?,
                description = ?,
                severity = ?,
                ipv4_address = ?,
                status = ?
            WHERE id = ?
            `,
            [
                title,
                description,
                severity,
                ipv4_address,
                status,
                id
            ]
        );

        res.json({
            message: 'Log actualizado correctamente'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const deleteLog = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            'DELETE FROM security_log WHERE id = ?',
            [id]
        );

        res.json({
            message: 'Log eliminado correctamente'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};