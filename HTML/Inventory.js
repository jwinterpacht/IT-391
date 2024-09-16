import React, { useState } from 'react';

function Inventory() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', quantity: '', expiration: '', category: '' });
    const [sortCategory, setSortCategory] = useState('');

    // Handle adding a new item
    const addItem = () => {
        if (!newItem.name || !newItem.quantity || !newItem.expiration || !newItem.category) {
            alert('Please fill in all fields.');
            return;
        }

        setItems([...items, newItem]);
        setNewItem({ name: '', quantity: '', expiration: '', category: '' });
    };

    // Handle deleting an item
    const deleteItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    // Handle sorting by category
    const handleSort = (category) => {
        setSortCategory(category);
    };

    // Filter items based on the selected category
    const filteredItems = sortCategory
        ? items.filter(item => item.category === sortCategory)
        : items;

    return (
        <div>
            <header>
                <h1>Dean's List</h1>
            </header>

            <nav>
                <a href="/inventory">Inventory</a>
                <a href="/list">List</a>
                <a href="/recipes">Recipes</a>
                <a href="/settings">Settings</a>
            </nav>

            <section id="content">
                <h2>Inventory</h2>
                <p>Manage your grocery inventory here. Add, edit, or delete items from your inventory list.</p>

                <div className="item-form">
                    <input
                        type="text"
                        placeholder="Item Name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                    />
                    <input
                        type="date"
                        placeholder="Expiration Date"
                        value={newItem.expiration}
                        onChange={(e) => setNewItem({ ...newItem, expiration: e.target.value })}
                    />
                    <select
                        value={newItem.category}
                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    >
                        <option value="">Select Category</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Produce">Produce</option>
                        <option value="Meat">Meat</option>
                        <option value="Beverages">Beverages</option>
                    </select>
                    <button onClick={addItem}>Add Item</button>
                </div>

                <div className="sort-category">
                    <label>Sort by Category: </label>
                    <select onChange={(e) => handleSort(e.target.value)}>
                        <option value="">All</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Produce">Produce</option>
                        <option value="Meat">Meat</option>
                        <option value="Beverages">Beverages</option>
                    </select>
                </div>

                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Expiration Date</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.expiration}</td>
                                <td>{item.category}</td>
                                <td>
                                    <button onClick={() => deleteItem(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default Inventory;
