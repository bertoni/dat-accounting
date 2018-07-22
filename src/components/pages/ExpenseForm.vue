<template>
  <form v-on:submit.prevent :class="['expense', 'form-wrapper']">
    <div class="form-row">
      <div class="form-group col-md-4 form-date">
        <label for="dateField">Date *</label>
        <span :class="['hidden', 'custom-select', {'is-valid': (formValidated && (!validation.date.length))}, {'is-invalid': (formValidated && (validation.date.length))}]"></span>
        <datepicker
          :format="'yyyy-MM-dd'"
          :typeable="true"
          id="dateField"
          placeholder="YYYY-MM-DD"
          v-model="expense.date">
        </datepicker>
        <div class="invalid-feedback">{{validation.date}}</div>
      </div>
      <div class="form-group col-md-4">
        <label for="categoryField">Category *</label>
        <select v-model="expense.category" id="categoryField" placeholder="Category" :class="['form-control', {'is-valid': (formValidated && (!validation.category.length))}, {'is-invalid': (formValidated && (validation.category.length))}]">
          <option value="">Choose category</option>
          <option v-for="(name, categoryKey) in categories" :value="name" :key="'optioncategory' + categoryKey">{{name}}</option>
        </select>
        <div class="invalid-feedback">{{validation.category}}</div>
      </div>
      <div class="form-group form-control-lg col-md-4">
        <input type="text" id="nameField" v-model.trim="expense.name" placeholder="A short name for expense" :class="['form-control', {'is-valid': (formValidated && (!validation.name.length))}, {'is-invalid': (formValidated && (validation.name.length))}]">
        <label for="nameField">Name *</label>
        <div class="invalid-feedback">{{validation.name}}</div>
      </div>
      <div class="form-group form-control-lg col-md-4">
        <input type="text" id="priceField"  v-money="money" v-model="expense.price" placeholder="99.99" :class="['form-control', {'is-valid': (formValidated && (!validation.price.length))}, {'is-invalid': (formValidated && (validation.price.length))}]">
        <label for="priceField">Price *</label>
        <div class="invalid-feedback">{{validation.price}}</div>
      </div>
      <div class="form-group col-md-4">
        <label for="typeField">Type *</label>
        <select v-model="expense.type" id="typeField" placeholder="Type" :class="['form-control', {'is-valid': (formValidated && (!validation.type.length))}, {'is-invalid': (formValidated && (validation.type.length))}]">
          <option value="">Choose type</option>
          <option v-for="(name, typeKey) in types" :value="name" :key="'optiontype' + typeKey">{{name}}</option>
        </select>
        <div class="invalid-feedback">{{validation.type}}</div>
      </div>
      <div class="form-group form-control-lg col-md-4">
        <input type="number" min="0" id="parcelsField" v-model.number="expense.parcel" placeholder="2" :class="['form-control', {'is-valid': formValidated}]">
        <label for="parcelsField" v-if="(typeof id === 'undefined')">Parcels</label>
        <label for="parcelsField" v-if="(typeof id !== 'undefined')">Parcel</label>
      </div>
      <div class="form-group col-md-4">
        <label for="situation-field-0">Situation *</label>
        <div v-for="(name, idx) in situations" :key="'optionsituation' + idx" :class="['custom-select', 'form-check', 'form-check-inline', {'is-valid': (formValidated && (!validation.situation.length))}, {'is-invalid': (formValidated && (validation.situation.length))}]">
          <label class="form-check-label">
            <input class="form-check-input" name="situation" :id="'situation-field-' + idx" type="radio" :value="name" v-model="expense.situation" required>
            <span class="radio-icon"></span>
            <span class="form-check-description">{{name}}</span>
          </label>
        </div>
        <div class="invalid-feedback">{{validation.situation}}</div>
      </div>
      <div class="form-group form-control-lg col-md-8">
        <input type="text" id="observationField" v-model="expense.observation" placeholder="Some observation about this expense, this will be help you in the future" :class="['form-control', {'is-valid': formValidated}]">
        <label for="observationField">Observation</label>
      </div>
      <div class="form-group form-control-lg col">
        <div class="col"><small class="text-primary-200">The fields with asterisk (*) are required</small></div>
        <div class="col-auto">
          <button v-show="!saving" class="btn btn-primary" @click="submit">Save</button>
          <button v-show="saving" class="btn btn-primary"><i class="icospinner"></i></button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import {validate} from '@/services/expense'
import Datepicker from 'vuejs-datepicker'
import {VMoney} from 'v-money'
export default {
  name: 'ExpenseForm',
  components: {
    Datepicker
  },
  directives: {money: VMoney},
  props: {
    date: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: [String, Number],
      required: true
    },
    parcel: {
      type: Number
    },
    type: {
      type: String,
      required: true
    },
    situation: {
      type: String,
      required: true
    },
    observation: {
      type: String
    },
    id: {
      type: String
    },
    parcelTotal: {
      type: Number
    }
  },
  data () {
    return {
      saving: false,
      formValidated: false,
      validation: {
        date: '',
        category: '',
        name: '',
        price: '',
        type: '',
        situation: ''
      },
      expense: {
        id: this.id,
        parcelTotal: this.parcelTotal,
        date: this.date,
        category: this.category,
        name: this.name,
        price: this.price,
        parcel: this.parcel || 0,
        type: this.type,
        situation: this.situation,
        observation: this.observation
      },
      money: {
        decimal: '.',
        thousands: ',',
        prefix: '$ ',
        suffix: '',
        precision: 2,
        masked: false
      }
    }
  },
  computed: {
    categories () {
      return this.$store.state.categories
    },
    types () {
      return this.$store.state.types
    },
    situations () {
      return this.$store.state.situations
    }
  },
  methods: {
    clearExpense () {
      this.expense.date = ''
      this.expense.category = ''
      this.expense.name = ''
      this.expense.price = this.money.prefix + '0' + this.money.decimal + '00'
      this.expense.parcel = 0
      this.expense.type = ''
      this.expense.situation = ''
      this.expense.observation = ''
      this.expense.parcelTotal = ''
    },
    clearValidate () {
      this.formValidated = false
      for (let idx in this.validation) {
        this.validation[idx] = ''
      }
    },
    dataIsValidate () {
      let check = true
      for (let idx in this.validation) {
        /* istanbul ignore else  */
        if (this.validation.hasOwnProperty(idx)) {
          check &= !this.validation[idx].length
        }
      }
      return check
    },
    submit () {
      this.clearValidate()
      validate(this.expense, this.validation, this.categories, this.types, this.situations)
      this.formValidated = true
      if (this.dataIsValidate()) {
        this.save()
      }
    },
    save () {
      this.saving = true
      if (typeof this.expense.id === 'string' && this.expense.id.length) {
        this.$store.dispatch('updateExpense', this.expense)
          .then(() => this.updateSuccess())
          .catch(/* istanbul ignore next */error => this.$store.dispatch('notify', {text: error.message}))
          .finally(/* istanbul ignore next */() => { this.saving = false })
      } else {
        this.$store.dispatch('createExpenses', this.expense)
          .then(() => this.createSuccess())
          .catch(/* istanbul ignore next */error => this.$store.dispatch('notify', {text: error.message}))
          .finally(/* istanbul ignore next */() => { this.saving = false })
      }
    },
    createSuccess () {
      this.$store.dispatch('notify', {type: 'success', text: 'Saved'})
      this.clearValidate()
      this.clearExpense()
    },
    updateSuccess () {
      this.$store.dispatch('notify', {type: 'success', text: 'Updated'})
      this.clearValidate()
    }
  }
}
</script>

<style scoped>
form.expense { width: 100%; }
.form-date { position: relative; z-index: 1; }
.custom-select {
  background: transparent;
  -webkit-box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0);
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0);
}
</style>
<style>
#contacts form input#dateField { background: transparent !important;  width: 100%; }
#contacts form .vdp-datepicker { width: 100%; }
</style>
