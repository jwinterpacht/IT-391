import React, { useState } from 'react';
import axios from 'axios';
import './Apps.css';

function SettingsPage() {
    // State to manage notifications
    const [expirationAlert, setExpirationAlert] = useState(true);
    const [lowStockAlert, setLowStockAlert] = useState(false);
    const [recipeSuggestionsAlert, setRecipeSuggestionsAlert] = useState(false);

    // State to manage theme
    const [theme, setTheme] = useState('light');

    // State to manage measurement units
    const [measurementUnits, setMeasurementUnits] = useState('metric');

    // State for language
    const [language, setLanguage] = useState('en');

    // State for default categories
    const [categories, setCategories] = useState(['Dairy', 'Produce', 'Meat']);
    const [newCategory, setNewCategory] = useState('');

    // State for recipe preferences
    const [preferences, setPreferences] = useState({
        vegetarian: false,
        vegan: false,
        glutenFree: false
    });

    // Handlers
    const handleAddCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            setNewCategory('');
        }
    };

    const handleRecipePreferenceChange = (e) => {
        setPreferences({
            ...preferences,
            [e.target.id]: e.target.checked
        });
    };

    return (
        <div>
            <header>
                <h1>Dean's Food List</h1>
            </header>

            <nav>
                <a href="/inventory">Inventory</a>
                <a href="/">List</a>
                <a href="/recipes">Recipes</a>
                <a href="/settings">Settings</a>
            </nav>

            <section id="content">
                <h2>Settings</h2>

                {/* Notifications */}
                <h3>Notifications</h3>
                <label>
                    <input
                        type="checkbox"
                        checked={expirationAlert}
                        onChange={() => setExpirationAlert(!expirationAlert)}
                    />
                    Expiration Date Alerts
                </label><br />
                <label>
                    <input
                        type="checkbox"
                        checked={lowStockAlert}
                        onChange={() => setLowStockAlert(!lowStockAlert)}
                    />
                    Low Stock Alerts
                </label><br />
                <label>
                    <input
                        type="checkbox"
                        checked={recipeSuggestionsAlert}
                        onChange={() => setRecipeSuggestionsAlert(!recipeSuggestionsAlert)}
                    />
                    Recipe Suggestions
                </label>

                {/* Theme */}
                <h3>Theme</h3>
                <label>
                    <input
                        type="radio"
                        name="theme"
                        value="light"
                        checked={theme === 'light'}
                        onChange={() => setTheme('light')}
                    /> Light Mode
                </label><br />
                <label>
                    <input
                        type="radio"
                        name="theme"
                        value="dark"
                        checked={theme === 'dark'}
                        onChange={() => setTheme('dark')}
                    /> Dark Mode
                </label>

                {/* Measurement Units */}
                <h3>Measurement Units</h3>
                <select
                    value={measurementUnits}
                    onChange={(e) => setMeasurementUnits(e.target.value)}
                >
                    <option value="metric">Metric (g, kg, L)</option>
                    <option value="imperial">Imperial (oz, lbs, qt)</option>
                </select>

                {/* Data Management */}
                <h3>Data Management</h3>
                <button>Export Data</button><br />
                <button>Import Data</button>

                {/* Language */}
                <h3>Language</h3>
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                </select>

                {/* Default Categories */}
                <h3>Default Categories</h3>
                <input
                    type="text"
                    value={newCategory}
                    placeholder="Add a new category"
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <button onClick={handleAddCategory}>Add Category</button>
                <ul id="category-list">
                    {categories.map((category, index) => (
                        <li key={index}>{category}</li>
                    ))}
                </ul>

                {/* Backup and Restore */}
                <h3>Backup and Restore</h3>
                <button>Backup Data</button>
                <button>Restore Data</button>

                {/* Recipe Preferences */}
                <h3>Recipe Preferences</h3>
                <label>
                    <input
                        type="checkbox"
                        id="vegetarian"
                        checked={preferences.vegetarian}
                        onChange={handleRecipePreferenceChange}
                    /> Vegetarian
                </label><br />
                <label>
                    <input
                        type="checkbox"
                        id="vegan"
                        checked={preferences.vegan}
                        onChange={handleRecipePreferenceChange}
                    /> Vegan
                </label><br />
                <label>
                    <input
                        type="checkbox"
                        id="glutenFree"
                        checked={preferences.glutenFree}
                        onChange={handleRecipePreferenceChange}
                    /> Gluten-Free
                </label>
            </section>
        </div>
    );
}

export default SettingsPage;
