import React from "react";
import classes from './../MyPage.module.css';
import { useDispatch } from "react-redux";
import { addSkillToKitAC } from "../../redux/profile-reducer";

const Skills = ({ skills, isOwner }) => {
    const dispatch = useDispatch();

    let skillKitItems = skills.filter(s => s.isSelected);
    let possibleItems = skills.filter(s => !s.isSelected);

    return <div className={classes.skillsWrapper}>

        <div>
            <h2>Навыки</h2>
            <div className={classes.plusIcon}></div>
            <div className={classes.editIcon}></div>
        </div>

        <div>
            <div className={classes.skillKit} >
                {skillKitItems.map(s => {
                    return <span className={classes.selectedSkill} key={s.id}>{s.skill}</span>;
                })}
            </div>
            {isOwner &&
                <div className={classes.skillPanel}>
                    <p>Возможно, вам стоит добавить в профиль эти навыки:</p>
                    <div>
                        {possibleItems.map(s => <span onClick={() => dispatch(addSkillToKitAC(s.id))} className={classes.freeSkill} key={s.id} >+ {s.skill}</span>)}
                    </div>
                </div>
            }
        </div>
    </div>
}

export default Skills;

