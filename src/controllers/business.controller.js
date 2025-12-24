import BusinessService from '../services/business.service.js';

const businessService = new BusinessService();

export const getBusiness = async (req, res) => {
    try {
    const business = await businessService.getAll();
    res.json({ status: 'success', result: business });
    } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
    }
};

export const getBusinessById = async (req, res) => {
    try {
    const business = await businessService.getById(req.params.id);
    if (!business) {
        return res.status(404).json({ status: 'error', error: 'Negocio no encontrado' });
    }
    res.json({ status: 'success', result: business });
    } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
    }
};

export const createBusiness = async (req, res) => {
    try {
    const business = await businessService.create(req.body);
    res.status(201).json({ status: 'success', result: business });
    } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
    }
};

export const addProduct = async (req, res) => {
    try {
    const { id } = req.params;
    const { id: productId, name, price, stock } = req.body;

    const productData = {
        id: Number(productId),
        name,
        price: Number(price),
        stock: stock === undefined ? 0 : Number(stock)
    };

    const updatedBusiness = await businessService.addProduct(id, productData);

    if (!updatedBusiness) {
        return res.status(404).json({ status: 'error', error: 'Negocio no encontrado' });
    }

    res.json({ status: 'success', result: updatedBusiness });
    } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
    const { id, pid } = req.params;
    const update = {};
    if (req.body.name !== undefined) update.name = req.body.name;
    if (req.body.price !== undefined) update.price = Number(req.body.price);
    if (req.body.stock !== undefined) update.stock = Number(req.body.stock);

    const updatedBusiness = await businessService.updateProduct(id, pid, update);
    if (!updatedBusiness) {
        return res.status(404).json({ status: 'error', error: 'Negocio o producto no encontrado' });
    }

    res.json({ status: 'success', result: updatedBusiness });
    } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
    const { id, pid } = req.params;

    const updatedBusiness = await businessService.deleteProduct(id, pid);
    if (!updatedBusiness) {
        return res.status(404).json({ status: 'error', error: 'Negocio o producto no encontrado' });
    }

    res.json({ status: 'success', result: updatedBusiness });
    } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
    }
};
