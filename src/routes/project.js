const express = require('express');
const router = express.Router();
const db = require('../config/db');
const ADMIN_SECRET = "0915";
const multer = require('multer');
const path = require('path');

// 저장 폴더: public/images/projects/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/projects/'));
    },
    filename: function (req, file, cb) {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, unique + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// 메인 페이지
router.get("/", async (req, res) => {
    const [projects] = await db.query("SELECT * FROM projects ORDER BY created_at ASC");

    for (let project of projects) {
        const [images] = await db.query(
            "SELECT image_url FROM project_images WHERE project_id = ?",
            [project.project_id]
        );
        console.log(project.project_id, images);

        project.images = images;
    }

    res.render("index", {
        projects,
        isAdmin: req.session?.isAdmin || false
    });
});

// 준비중 페이지
router.get("/coming-soon", (req, res) => {
    res.render("coming-soon", { isAdmin: req.session?.isAdmin || false });
});


// 관리자 페이지
router.get(`/admin${ADMIN_SECRET}`, async (req, res) => {
    const [projects] = await db.query("SELECT * FROM projects ORDER BY created_at ASC");

    for (let project of projects) {
        const [images] = await db.query(
            "SELECT image_url FROM project_images WHERE project_id = ?",
            [project.project_id]
        );
        project.images = images;
    }

    res.render("index", {
        projects,
        isAdmin: true
    });
});


//프로젝트 등록 (GET)
router.get(`/admin${ADMIN_SECRET}/new`, (req, res) => {
    res.render("admin/newProject", {
        isAdmin: true
    });
});


//프로젝트 등록 (POST)
router.post(`/admin${ADMIN_SECRET}/new`, upload.array("images", 10), async (req, res) => {
    const {
        title, summary, description,
        tech_stack, github_url, deploy_url
    } = req.body;

    const is_ready = Number(req.body.is_ready);

    const files = req.files;

    try {
        const [result] = await db.query(
            `INSERT INTO projects 
            (title, summary, description, tech_stack, github_url, deploy_url, is_ready)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, summary, description, tech_stack, github_url, deploy_url, is_ready]
        );

        const projectId = result.insertId;

        if (files && files.length > 0) {
            const inserts = files.map(file => {
                const imgPath = `/images/projects/${file.filename}`;
                return db.query(
                    `INSERT INTO project_images (project_id, image_url)
                    VALUES (?, ?)`,
                    [projectId, imgPath]
                );
            });
            await Promise.all(inserts);
        }

        res.redirect(`/admin${ADMIN_SECRET}`);

    } catch (err) {
        console.error("등록 오류:", err);
        res.status(500).send("프로젝트 등록 실패");
    }
});


// 프로젝트 수정 (GET)
router.get(`/admin${ADMIN_SECRET}/edit/:id`, async (req, res) => {
    const id = req.params.id;

    const [rows] = await db.query(
        "SELECT * FROM projects WHERE project_id = ?",
        [id]
    );

    const [images] = await db.query(
        "SELECT * FROM project_images WHERE project_id = ?",
        [id]
    );

    if (!rows.length) return res.send("프로젝트를 찾을 수 없습니다.");

    res.render("admin/editProject", {
        project: rows[0],
        images
    });
});

// 프로젝트 수정 (POST)
router.post(`/admin${ADMIN_SECRET}/edit/:id`, upload.array("images", 10), async (req, res) => {
    const projectId = req.params.id;

    const {
        title, summary, description,
        tech_stack, github_url, deploy_url
    } = req.body;

    const is_ready = Number(req.body.is_ready);

    try {
        await db.query(
            `UPDATE projects SET
                title=?, summary=?, description=?, tech_stack=?,
                github_url=?, deploy_url=?, is_ready=?, updated_at=NOW()
             WHERE project_id=?`,
            [
                title, summary, description, tech_stack,
                github_url, deploy_url, is_ready,
                projectId
            ]
        );

        const files = req.files;
        if (files && files.length > 0) {
            const inserts = files.map(file => {
                const imgPath = `/images/projects/${file.filename}`;
                return db.query(
                    `INSERT INTO project_images (project_id, image_url)
                     VALUES (?, ?)`,
                    [projectId, imgPath]
                );
            });
            await Promise.all(inserts);
        }

        res.redirect(`/admin${ADMIN_SECRET}`);

    } catch (err) {
        console.error("수정 오류:", err);
        res.status(500).send("프로젝트 수정 실패");
    }
});

router.get(`/admin${ADMIN_SECRET}/delete/:id`, async (req, res) => {
    const id = req.params.id;
    await db.query("DELETE FROM project_images WHERE project_id=?", [id]);
    await db.query("DELETE FROM projects WHERE project_id=?", [id]);

    res.redirect(`/admin${ADMIN_SECRET}`);
});


module.exports = router;
