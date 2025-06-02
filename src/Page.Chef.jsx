import { useState, useRef, useEffect } from 'react'
import IngredientsList from './components/IngredientsList.jsx'
import ClaudeRecipe from './components/ClaudeRecipe.jsx'
import { getRecipeFromMistral } from './ai.js'

export function Header() {
    return (
        <header>
            <img src="./src/assets/chefClaude.png"/>
            <h1>Chef Claude</h1>
        </header>
    )
}

export default function Main() {
    const [ingredientsArray, setIngredients] = useState(["Angel Hair Noodles", "Oregano", "Roma Tomatoes", "Parsley", "Bay Leaves", "Garlic", "Turmeric", "Onions", "Carrots"])
    function addingredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    const [count, setCount] = useState(0)
    function handleAdd(e) {
        e.preventDefault()
        setCount(prevCount => prevCount + 1)
    }
    function subtract(e) {
        e.preventDefault()
        setCount(prevCount => prevCount - 1)
    }

    /* const [recipeShown, setRecipeShown] = useState(false)
    function toggleRecipe() {
        setRecipeShown(prev => !prev)
    } */

    const [recipe, setRecipe] = useState("")
    const recipeSection = useRef(null)

    useEffect(() => {
        if (recipe && recipeSection.current) { recipeSection.current.scrollIntoView({behavior: "smooth"}) }
    }, [recipe])

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredientsArray)
        console.log(recipeMarkdown)
        setRecipe(recipeMarkdown)
    }

    return (
        <main>
            <form className="add-ingredient-form" action={addingredient}>
                <input type="text" placeholder="e.g. Jalapeños" aria-label="add a new ingredient" name="ingredient" />
                <button>add ingredient</button>
                <div>
                    <button className="round-button" onClick={subtract}>-</button>
                    <button className="state-button" onClick={handleAdd}>state #{count}</button>
                </div>
            </form>
            {ingredientsArray.length ? <IngredientsList
                ingredientsArray={ingredientsArray}
                ref={recipeSection}
                getRecipe={getRecipe}
            /> : null}
            {recipe ? <ClaudeRecipe recipe={recipe} /> : null}
        </main>
    )
}
