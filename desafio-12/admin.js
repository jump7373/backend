const isAdmin = (req, res, next) => {
    const admin = true;
    if(admin) next();
    else res.json({error: "No tienes permisos"})
}

module.exports = isAdmin