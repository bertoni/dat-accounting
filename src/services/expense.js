export const validate = (expense, validation, categories = [], types = [], situations = []) => {
  if (!expense.date) {
    validation.date = 'Date is empty'
  } else if (!expense.date.toString().trim().length) {
    validation.date = 'Date incorrect'
  }
  if (!expense.category || !expense.category.toString().trim().length) {
    validation.category = 'Choose a category'
  } else if (categories.indexOf(expense.category) < 0) {
    validation.category = 'Invalid category'
  }
  if (!expense.name || !expense.name.toString().trim().length) {
    validation.name = 'The name is required'
  }
  if (!expense.price || !expense.price.toString().trim().length) {
    validation.price = 'The price is required'
  } else if (!parseFloat(expense.price.toString().replace(/\$\s/, ''))) {
    validation.price = 'The price should be not empty'
  }
  if (!expense.type || !expense.type.toString().trim().length) {
    validation.type = 'Choose a type'
  } else if (types.indexOf(expense.type) < 0) {
    validation.type = 'Invalid type'
  }
  if (!expense.situation || !expense.situation.toString().trim().length) {
    validation.situation = 'Choose a situation'
  } else if (situations.indexOf(expense.situation) < 0) {
    validation.situation = 'Invalid situation'
  }
}
