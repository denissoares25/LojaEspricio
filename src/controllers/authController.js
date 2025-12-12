const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { clienteModel } = require("../models/clienteModel");

const authController = {
    clienteLogin: async (req, res) => {
        try {
            const {emailCliente,cpfCliente, senhaCliente} = req.body

            if ((emailCliente == undefined && cpfCliente == undefined) || senhaCliente == undefined){
                return res.status(400).json({ error: "Email ou CPF e senha são obrigatorios"});
            }

            const result = await clienteModel.buscarEmailOrCPF(cpfCliente,emailCliente);

            if(result.length == 0){
                 return res.status(401).json({ error: "Email ou CPF não encontrado"});
            }

            const cliente = result[0];

            const senhaValida = await bcrypt.compare(senhaCliente, cliente.senhaCliente);

            if (!senhaValida) {
                 return res.status(401).json({ error: "Senha inválida"});
            }

            const payload = {
                idCliente: cliente.idCliente,
                nomeCliente: cliente.nomeCliente,
                tipoUsuario: "cliente"
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

            res.cookie("token", token, {
                httpOly: true,
                secure: false,
                sameSite: "strict",
                maxAge: Number(process.env.JWT_TIME_EXPIRES_IN)
            });

            return res.status(200).json({ massage: "Login realizado com sucesso", token});

      } catch (error) {
            console.error("Erro no login do cliente", error);
            return res.status(500).json({erro: "Erro interno no servidor ao realizar o login do cliente"})

        }
    }
};

module.exports = { authController };