export default function IngredientsList(props) {
    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">
                {props.ingredientsArray.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                ))}
            </ul>
            {props.ingredientsArray.length > 3 && <div className="get-recipe-container" ref={props.ref}>
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe using your list of ingredients.</p>
                </div>
                <button onClick={props.getRecipe}>Get a recipe!</button>
            </div>}
        </section>
    )
}
