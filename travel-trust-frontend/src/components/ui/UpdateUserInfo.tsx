import EditModal from './EditModal'
import Form from '../forms/Form'
import FormInput from '../forms/FormInput'
import { IUser } from '@/types'
import { ProfileImageUpload } from '@/views/Profile'
import CustomSelect from './CustomSelect'
import { Button } from 'antd'

interface IUpdateUserInfo {
  user: IUser | null
  gender: 'Male' | 'Female' | 'Custom' | string
  age: string
  showEditModal: boolean

  isLoading: boolean
  uploadLoading: boolean
  setShowEditModal: (data: boolean) => void
  setGender: (data: string) => void
  setAge: (data: string) => void
  handleProfileUpdate: (data: any) => void
  handleUpload: any
}

const UpdateUserInfo = ({
  user,
  showEditModal,
  setShowEditModal,
  gender,
  age,
  setGender,
  setAge,
  isLoading,
  uploadLoading,
  handleUpload,
  handleProfileUpdate,
}: IUpdateUserInfo) => {
  return (
    <EditModal
      title={user?.username}
      open={showEditModal}
      onCancel={() => setShowEditModal(false)}
    >
      <Form submitHandler={handleProfileUpdate}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full lg:w-[70%] flex flex-col gap-1">
              <FormInput
                name="username"
                size="large"
                disabled
                defaultValue={user?.username}
              />

              <FormInput
                name="email"
                size="large"
                placeholder="Email"
                disabled
                defaultValue={user?.email}
              />
              <FormInput
                name="contactNo"
                type="text"
                size="large"
                placeholder="Contact number"
                defaultValue={user?.contactNo}
              />
              <FormInput
                name="address"
                type="text"
                size="large"
                placeholder="Address"
                defaultValue={user?.address}
                isStyles
              />
            </div>

            <div className="lg:w-[30%]">
              {ProfileImageUpload(user, uploadLoading, handleUpload)}
            </div>
          </div>

          <div className="flex gap-5">
            <CustomSelect
              placeholder="Gender"
              onChange={setGender}
              value={gender ?? user?.gender ?? null}
              optionsValue={['Male', 'Female', 'Custom']}
              style={{
                border: '1px solid #FFD20A',
              }}
            />
            <CustomSelect
              placeholder="Age"
              onChange={setAge}
              value={age ?? user?.age ?? null}
              optionsValue={[20, 21, 22, 23, 24, 25, 26]}
              style={{
                border: '1px solid #FFD20A',
              }}
            />
          </div>

          <Button
            htmlType="submit"
            type="primary"
            size="large"
            loading={isLoading}
          >
            Update
          </Button>
        </div>
      </Form>
    </EditModal>
  )
}

export default UpdateUserInfo
