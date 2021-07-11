import classes from './Permissions.module.scss'
import React from 'react'
import Checkbox from '../UI/Checkbox/Checkbox'

const cls = [classes.permsListItem, classes.permsListItemSub]

class Permissions extends React.Component {
  render() {
    return (
      <form className={classes.mainSectionForm}>
        <div className={classes.mainSectionPerms}>
          <ul className={classes.permsList}>
            <li className={classes.permsListItem}>
              <p className={classes.permsListText}>Пользователи</p>
            </li>
            <li className={classes.permsListItem}>
              <p className={classes.permsListText}>Чеки</p>
            </li>
            <li className={cls.join(' ')}>
              <p className={classes.permsListText}>Удаление</p>
            </li>
            <li className={cls.join(' ')}>
              <p className={classes.permsListText}>Редактирование</p>
            </li>
            <li className={cls.join(' ')}>
              <p className={classes.permsListText}>Корректировка</p>
            </li>

            <li className={classes.permsListItem}>
              <p className={classes.permsListText}>Шаблоны</p>
            </li>
            <li className={classes.permsListItem}>
              <p className={classes.permsListText}>Оплата</p>
            </li>
            <li className={classes.permsListItem}>
              <p className={classes.permsListText}>Возвраты</p>
            </li>
          </ul>
          <ul className={classes.catalogFormCheckboxes}>
            <li className={classes.checkboxesListItem}>
              <p className={classes.checkboxesItemText}>Admin</p>
            </li>
            <li className={classes.checkboxesListItem}>
              <Checkbox
                type={'checkbox'}
                name={'gridItemCheckbox1'}
                value={'1'}
                id={'checkbox-1'}
                defaultChecked={true}
              />
            </li>
            <li className={classes.checkboxesListItem}>
              <Checkbox
                type={'checkbox'}
                name={'gridItemCheckbox2'}
                value={'2'}
                id={'checkbox-2'}
                defaultChecked={true}
              />
            </li>
            <li className={classes.checkboxesListItem}>
              <Checkbox
                type={'checkbox'}
                name={'gridItemCheckbox3'}
                value={'3'}
                id={'checkbox-3'}
                defaultChecked={true}
              />
            </li>
            <li className={classes.checkboxesListItem}>
              <Checkbox
                type={'checkbox'}
                name={'gridItemCheckbox4'}
                value={'4'}
                id={'checkbox-4'}
                defaultChecked={true}
              />
            </li>
            <li className={classes.checkboxesListItem}>
              <Checkbox
                type={'checkbox'}
                name={'gridItemCheckbox5'}
                value={'5'}
                id={'checkbox-5'}
                defaultChecked={true}
              />
            </li>
            <li className={classes.checkboxesListItem}>
              <Checkbox
                type={'checkbox'}
                name={'gridItemCheckbox6'}
                value={'6'}
                id={'checkbox-6'}
                defaultChecked={true}
              />
            </li>
            <li className={classes.checkboxesListItem}>
              <Checkbox
                type={'checkbox'}
                name={'gridItemCheckbox7'}
                value={'7'}
                id={'checkbox-7'}
                defaultChecked={true}
              />
            </li>
          </ul>
          <ul className={classes.catalogFormCheckboxes}>
            <li className={classes.checkboxesListItem}>
              <p className={classes.checkboxesItemText}>Trener</p>
            </li>
            <li className={classes.checkboxesListItem}>
              <Checkbox
                type={'checkbox'}
                name={'gridItemCheckbox101'}
                value={'101'}
                id={'checkbox-101'}
                defaultChecked={true}
              />
            </li>
            <li className={classes.checkboxesListItem}>
              <Checkbox
                type={'checkbox'}
                name={'gridItemCheckbox102'}
                value={'102'}
                id={'checkbox-102'}
                defaultChecked={true}
              />
            </li>
            <li className={classes.checkboxesListItem}>
              <Checkbox
                type={'checkbox'}
                name={'gridItemCheckbox103'}
                value={'103'}
                id={'checkbox-103'}
                defaultChecked={true}
              />
            </li>
            <li className={classes.checkboxesListItem}>
              <Checkbox
                type={'checkbox'}
                name={'gridItemCheckbox104'}
                value={'104'}
                id={'checkbox-104'}
                defaultChecked={true}
              />
            </li>
            <li className={classes.checkboxesListItem}>
              <Checkbox
                type={'checkbox'}
                name={'gridItemCheckbox105'}
                value={'105'}
                id={'checkbox-105'}
                defaultChecked={true}
              />
            </li>
            <li className={classes.checkboxesListItem}>
              <Checkbox
                type={'checkbox'}
                name={'gridItemCheckbox106'}
                value={'106'}
                id={'checkbox-106'}
                defaultChecked={true}
              />
            </li>
            <li className={classes.checkboxesListItem}>
              <Checkbox
                type={'checkbox'}
                name={'gridItemCheckbox107'}
                value={'107'}
                id={'checkbox-107'}
                defaultChecked={true}
              />
            </li>
          </ul>
        </div>
        <button
          className="btn btn--submit"
          onChange={this.props.changePermissions}
        >
          Сохранить
        </button>
      </form>
    )
  }
}

export default Permissions
