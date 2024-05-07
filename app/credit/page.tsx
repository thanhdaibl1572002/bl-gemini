'use client'
import { FC, useMemo, useState } from 'react'
import styles from '@/app/credit/creadit.module.sass'
import RadioGroup from '@/components/forms/RadioGroup'
import TextField from '@/components/forms/TextField'
import Select from '@/components/forms/Select'
import Button from '@/components/forms/Button'
import { PiArrowFatRight } from 'react-icons/pi'
import { HiOutlineCheckCircle, HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { calculateDateFromDaysAgo, calculateDaysFromDate, getCurrentDate } from '@/utils'
import { blueGradientColor, daiblColor, daiblGradientColor, greenColor, redColor, redGradientColor, whiteColor } from '@/variables/variables'
import axios from 'axios'
import Swal from 'sweetalert2'


interface ICreditProps {

}

interface IFormData {
    CODE_GENDER: null | string
    FLAG_OWN_CAR: null | string
    FLAG_OWN_REALTY: null | string
    CNT_CHILDREN: null | number
    AMT_INCOME_TOTAL: null | number
    NAME_INCOME_TYPE: null | string
    NAME_EDUCATION_TYPE: null | string
    NAME_FAMILY_STATUS: null | string
    NAME_HOUSING_TYPE: null | string
    DAYS_BIRTH: null | string | number
    DAYS_EMPLOYED: null | string | number
    FLAG_WORK_PHONE: null | 0 | 1
    FLAG_PHONE: null | 0 | 1
    FLAG_EMAIL: null | 0 | 1
    OCCUPATION_TYPE: null | string
    CNT_FAM_MEMBERS: null | number
    MONTHS_BALANCE: null | string | number
}

const fillData0: IFormData = {
    CODE_GENDER: 'M',
    FLAG_OWN_CAR: 'Y',
    FLAG_OWN_REALTY: 'Y',
    CNT_CHILDREN: 0,
    AMT_INCOME_TOTAL: 135000.0,
    NAME_INCOME_TYPE: 'Working',
    NAME_EDUCATION_TYPE: 'Secondary / secondary special',
    NAME_FAMILY_STATUS: 'Married',
    NAME_HOUSING_TYPE: 'House / apartment',
    DAYS_BIRTH: calculateDateFromDaysAgo(-21065),
    DAYS_EMPLOYED: calculateDateFromDaysAgo(-1458),
    FLAG_WORK_PHONE: 0,
    FLAG_PHONE: 1,
    FLAG_EMAIL: 0,
    OCCUPATION_TYPE: 'Laborers',
    CNT_FAM_MEMBERS: 2.0,
    MONTHS_BALANCE: calculateDateFromDaysAgo(-8)
}

const fillData1: IFormData = {
    CODE_GENDER: 'F',
    FLAG_OWN_CAR: 'N',
    FLAG_OWN_REALTY: 'Y',
    CNT_CHILDREN: 1,
    AMT_INCOME_TOTAL: 585000.0,
    NAME_INCOME_TYPE: 'Commercial associate',
    NAME_EDUCATION_TYPE: 'Higher education',
    NAME_FAMILY_STATUS: 'Single / not married',
    NAME_HOUSING_TYPE: 'House / apartment',
    DAYS_BIRTH: calculateDateFromDaysAgo(-10430),
    DAYS_EMPLOYED: calculateDateFromDaysAgo(-900),
    FLAG_WORK_PHONE: 0,
    FLAG_PHONE: 0,
    FLAG_EMAIL: 0,
    OCCUPATION_TYPE: 'Managers',
    CNT_FAM_MEMBERS: 2.0,
    MONTHS_BALANCE: calculateDateFromDaysAgo(-19)
}

const Credit: FC<ICreditProps> = ({ }) => {

    const [formData, setFormData] = useState<IFormData>({
        CODE_GENDER: null,
        FLAG_OWN_CAR: null,
        FLAG_OWN_REALTY: null,
        CNT_CHILDREN: null,
        AMT_INCOME_TOTAL: null,
        NAME_INCOME_TYPE: null,
        NAME_EDUCATION_TYPE: null,
        NAME_FAMILY_STATUS: null,
        NAME_HOUSING_TYPE: null,
        DAYS_BIRTH: null,
        DAYS_EMPLOYED: null,
        FLAG_WORK_PHONE: null,
        FLAG_PHONE: null,
        FLAG_EMAIL: null,
        OCCUPATION_TYPE: null,
        CNT_FAM_MEMBERS: null,
        MONTHS_BALANCE: null
    })

    const handleChange = (key: string, value: any): void => {
        if (value !== undefined && value !== '') {
            setFormData(prevFormData => ({
                ...prevFormData,
                [key]: value
            }))
        }
    }

    const handleSubmit = async (): Promise<void> => {
        const formDataSubmit = {
            ...formData,
            DAYS_BIRTH: calculateDaysFromDate(formData.DAYS_BIRTH as string),
            DAYS_EMPLOYED: calculateDaysFromDate(formData.DAYS_EMPLOYED as string),
            MONTHS_BALANCE: calculateDaysFromDate(formData.MONTHS_BALANCE as string),
        }
        try {
            const response = await axios.post(`${process.env.daiblServerUrl as string}/credit`, formDataSubmit)
            if (response.data === 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    iconColor: daiblColor,
                    title: 'Bạn có rủi ro tính dụng THẤP',
                    showConfirmButton: true,
                    confirmButtonText: 'Đóng',
                    confirmButtonColor: daiblColor,
                    buttonsStyling: true

                })
            } else if (response.data === 1) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Bạn có rủi ro tính dụng CAO',
                    showConfirmButton: true,
                    confirmButtonText: 'Đóng',
                    confirmButtonColor: redColor,
                    focusConfirm: false
                })
            }
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Có lỗi xảy ra',
                showConfirmButton: true,
                confirmButtonText: 'Đóng',
                confirmButtonColor: redColor,
            })
        }
    }

    const handleFill = (type: 0 | 1) => {
        type === 0 ? setFormData(fillData0) : setFormData(fillData1)
    }

    return (
        <div className={styles._container}>
            <div className={styles._title}>
                <h1>Phân loại rủi ro tín dụng</h1>
                <div className={styles._fill}>
                    <Button
                        buttonIcon={<HiOutlineCheckCircle />}
                        buttonIconColor={whiteColor}
                        buttonIconSize={25}
                        buttonWidth={38}
                        buttonHeight={38}
                        buttonBackground={blueGradientColor}
                        buttonBubbleColor={whiteColor}
                        onClick={() => handleFill(0)}
                    />
                    <Button
                        buttonIcon={<HiOutlineExclamationTriangle />}
                        buttonIconColor={whiteColor}
                        buttonIconSize={25}
                        buttonWidth={38}
                        buttonHeight={38}
                        buttonBackground={redGradientColor}
                        buttonBubbleColor={whiteColor}
                        onClick={() => handleFill(1)}
                    />
                </div>
            </div>
            <div className={styles._row}>
                <div className={styles._col}>
                    <strong>Giới tính {formData.CODE_GENDER === null && <span>*</span>}</strong>
                    <RadioGroup
                        options={useMemo(() => [
                            { label: 'Nam', value: 'M' },
                            { label: 'Nữ', value: 'F' },
                        ], [])}
                        value={formData.CODE_GENDER}
                        onChange={value => handleChange('CODE_GENDER', value)}
                    />
                </div>
                <div className={styles._col}>
                    <strong>Sở hữu xe hơi {formData.FLAG_OWN_CAR === null && <span>*</span>}</strong>
                    <RadioGroup
                        options={useMemo(() => [
                            { label: 'Có', value: 'Y' },
                            { label: 'Không', value: 'N' },
                        ], [])}
                        value={formData.FLAG_OWN_CAR}
                        onChange={value => handleChange('FLAG_OWN_CAR', value)}
                    />
                </div>
            </div>
            <div className={styles._row}>
                <div className={styles._col}>
                    <strong>Sở hữu bất động sản {formData.FLAG_OWN_REALTY === null && <span>*</span>}</strong>
                    <RadioGroup
                        options={useMemo(() => [
                            { label: 'Có', value: 'Y' },
                            { label: 'Không', value: 'N' },
                        ], [])}
                        value={formData.FLAG_OWN_REALTY}
                        onChange={value => handleChange('FLAG_OWN_REALTY', value)}
                    />
                </div>
                <div className={styles._col}>
                    <strong>Số điện thoại làm việc {formData.FLAG_WORK_PHONE === null && <span>*</span>}</strong>
                    <RadioGroup
                        options={useMemo(() => [
                            { label: 'Có', value: 1 },
                            { label: 'Không', value: 0 },
                        ], [])}
                        value={formData.FLAG_WORK_PHONE}
                        onChange={value => handleChange('FLAG_WORK_PHONE', value)}
                    />
                </div>
            </div>
            <div className={styles._row}>
                <div className={styles._col}>
                    <strong>Số điện thoại cá nhân {formData.FLAG_PHONE === null && <span>*</span>}</strong>
                    <RadioGroup
                        options={useMemo(() => [
                            { label: 'Có', value: 1 },
                            { label: 'Không', value: 0 },
                        ], [])}
                        value={formData.FLAG_PHONE}
                        onChange={value => handleChange('FLAG_PHONE', value)}
                    />
                </div>
                <div className={styles._col}>
                    <strong>Email làm việc {formData.FLAG_EMAIL === null && <span>*</span>}</strong>
                    <RadioGroup
                        options={useMemo(() => [
                            { label: 'Có', value: 1 },
                            { label: 'Không', value: 0 },
                        ], [])}
                        value={formData.FLAG_EMAIL}
                        onChange={value => handleChange('FLAG_EMAIL', value)}
                    />
                </div>
            </div>
            <div className={styles._row}>
                <div className={styles._col}>
                    <strong>Hạng mục thu nhập {formData.NAME_INCOME_TYPE === null && <span>*</span>}</strong>
                    <Select
                        width={'100%'}
                        options={useMemo(() => [
                            { label: 'Chọn hạng mục', value: null },
                            { label: 'Working', value: 'Working' },
                            { label: 'Commercial associate', value: 'Commercial associate' },
                            { label: 'Pensioner', value: 'Pensioner' },
                            { label: 'State servant', value: 'State servant' },
                        ], [])}
                        value={formData.NAME_INCOME_TYPE}
                        onChange={value => handleChange('NAME_INCOME_TYPE', value)}
                    />
                </div>
                <div className={styles._col}>
                    <strong>Trình độ học vấn {formData.NAME_EDUCATION_TYPE === null && <span>*</span>}</strong>
                    <Select
                        width={'100%'}
                        options={useMemo(() => [
                            { label: 'Chọn trình độ', value: null },
                            { label: 'Secondary / secondary special', value: 'Secondary / secondary special' },
                            { label: 'Higher education', value: 'Higher education' },
                            { label: 'Incomplete higher', value: 'Incomplete higher' },
                            { label: 'Lower secondary', value: 'Lower secondary' },
                        ], [])}
                        value={formData.NAME_EDUCATION_TYPE}
                        onChange={value => handleChange('NAME_EDUCATION_TYPE', value)}
                    />
                </div>
            </div>
            <div className={styles._row}>
                <div className={styles._col}>
                    <strong>Tình trạng hôn nhân {formData.NAME_FAMILY_STATUS === null && <span>*</span>}</strong>
                    <Select
                        width={'100%'}
                        options={useMemo(() => [
                            { label: 'Chọn tình trạng hôn nhân', value: null },
                            { label: 'Married', value: 'Married' },
                            { label: 'Single / not married', value: 'Single / not married' },
                            { label: 'Widow', value: 'Widow' },
                            { label: 'Civil marriage', value: 'Civil marriage' },
                            { label: 'Separated', value: 'Separated' },
                        ], [])}
                        value={formData.NAME_FAMILY_STATUS}
                        onChange={value => handleChange('NAME_FAMILY_STATUS', value)}
                    />
                </div>
                <div className={styles._col}>
                    <strong>Nơi ở {formData.NAME_HOUSING_TYPE === null && <span>*</span>}</strong>
                    <Select
                        width={'100%'}
                        options={useMemo(() => [
                            { label: 'Chọn nơi ở', value: null },
                            { label: 'House apartment', value: 'House apartment' },
                            { label: 'With parents', value: 'With parents' },
                            { label: 'Municipal apartment', value: 'Municipal apartment' },
                            { label: 'Office apartment', value: 'Office apartment' },
                            { label: 'Rented apartment', value: 'Rented apartment' },
                            { label: 'Co-op apartment', value: 'Co-op apartment' },
                        ], [])}
                        value={formData.NAME_HOUSING_TYPE}
                        onChange={value => handleChange('NAME_HOUSING_TYPE', value)}
                    />
                </div>
            </div>
            <div className={styles._row}>
                <div className={styles._col}>
                    <strong>Ngày sinh {formData.DAYS_BIRTH === null && <span>*</span>}</strong>
                    <TextField
                        width={'100%'}
                        height={'fit-content'}
                        border='none'
                        focusBorder='none'
                        value={formData.DAYS_BIRTH}
                        onChange={value => handleChange('DAYS_BIRTH', value)}
                        padding='0'
                        type='date'
                        max={getCurrentDate()}
                    />
                </div>
                <div className={styles._col}>
                    <strong>Ngày bắt đầu làm việc {formData.DAYS_EMPLOYED === null && <span>*</span>}</strong>
                    <TextField
                        width={'100%'}
                        height={'fit-content'}
                        border='none'
                        focusBorder='none'
                        value={formData.DAYS_EMPLOYED}
                        onChange={value => handleChange('DAYS_EMPLOYED', value)}
                        padding='0'
                        type='date'
                        max={getCurrentDate()}
                    />
                </div>
            </div>
            <div className={styles._row}>
                <div className={styles._col}>
                    <strong>Ngày tạo tài khoản {formData.MONTHS_BALANCE === null && <span>*</span>}</strong>
                    <TextField
                        width={'100%'}
                        height={'fit-content'}
                        border='none'
                        focusBorder='none'
                        value={formData.MONTHS_BALANCE}
                        onChange={value => handleChange('MONTHS_BALANCE', value)}
                        padding='0'
                        type='date'
                        max={getCurrentDate()}
                    />
                </div>
                <div className={styles._col}>
                    <strong>Thu nhập hàng năm ($) {formData.AMT_INCOME_TOTAL === null && <span>*</span>}</strong>
                    <TextField
                        height={'fit-content'}
                        border='none'
                        focusBorder='none'
                        value={formData.AMT_INCOME_TOTAL}
                        onChange={value => handleChange('AMT_INCOME_TOTAL', value)}
                        padding='0'
                        placeholder='vd: 3000'
                        type='number'
                        min={0}
                    />
                </div>
            </div>
            <div className={styles._row}>
                <div className={styles._col}>
                    <strong>Số lượng con cái {formData.CNT_CHILDREN === null && <span>*</span>}</strong>
                    <TextField
                        width={'100%'}
                        height={'fit-content'}
                        border='none'
                        focusBorder='none'
                        value={formData.CNT_CHILDREN}
                        onChange={value => handleChange('CNT_CHILDREN', value)}
                        padding='0'
                        type='number'
                        placeholder='vd: 2'
                        min={0}
                    />
                </div>
                <div className={styles._col}>
                    <strong>Số lượng thành viên gia đình {formData.CNT_FAM_MEMBERS === null && <span>*</span>}</strong>
                    <TextField
                        width={'100%'}
                        height={'fit-content'}
                        border='none'
                        focusBorder='none'
                        value={formData.CNT_FAM_MEMBERS}
                        onChange={value => handleChange('CNT_FAM_MEMBERS', value)}
                        padding='0'
                        type='number'
                        placeholder='vd: 3'
                        min={0}
                    />
                </div>
            </div>
            <div className={styles._row}>
                <div className={styles._col}>
                    <strong>Nghề nghiệp {formData.OCCUPATION_TYPE === null && <span>*</span>}</strong>
                    <Select
                        width={'100%'}
                        options={useMemo(() => [
                            { label: 'Chọn nghề nghiệp', value: null },
                            { label: 'Core staff', value: 'Core staff' },
                            { label: 'Laborers', value: 'Laborers' },
                            { label: 'Managers', value: 'Managers' },
                            { label: 'Sales staff', value: 'Sales staff' },
                            { label: 'Drivers', value: 'Drivers' },
                            { label: 'High skill tech staff', value: 'High skill tech staff' },
                            { label: 'Accountants', value: 'Accountants' },
                            { label: 'Security staff', value: 'Security staff' },
                            { label: 'Medicine staff', value: 'Medicine staff' },
                            { label: 'Cooking staff', value: 'Cooking staff' },
                            { label: 'Low-skill Laborers', value: 'Low-skill Laborers' },
                            { label: 'Cleaning staff', value: 'Cleaning staff' },
                            { label: 'IT staff', value: 'IT staff' },
                            { label: 'Secretaries', value: 'Secretaries' },
                            { label: 'Private service staff', value: 'Private service staff' },
                            { label: 'Waiters/barmen staff', value: 'Waiters/barmen staff' },
                            { label: 'HR staff', value: 'HR staff' },
                        ], [])}
                        value={formData.OCCUPATION_TYPE}
                        onChange={value => handleChange('OCCUPATION_TYPE', value)}
                    />
                </div>
            </div>
            <div className={styles._submit}>
                <Button
                    buttonWidth={120}
                    buttonHeight={45}
                    buttonText='Phân Loại'
                    buttonTextSize={15}
                    buttonIcon={<PiArrowFatRight />}
                    buttonIconPosition={'right'}
                    buttonIconSize={20}
                    onClick={handleSubmit}
                    disabled={Object.values(formData).some(value => value === null)}
                />
            </div>
        </div>
    )
}

export default Credit