import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import uuid from 'uuid-random'

import { createRoom as dbCreateRoom } from '../hooks/useFirestore'

import Button from '../components/Button'
import Input from '../components/Input'
// import Heading from '../components/Heading'
import Layout from '../components/Layout'
import SelectInput from '../components/SelectInput'

import firebase from '../libs/firebase';




export default function CreateRoom() {
  const router = useRouter()
  const [userName, setUserName] = useState(null)
  const [roomName, setRoomName] = useState('')
  const [roomTopic, setRoomTopic] = useState(null)
  const [roomLocation, setRoomLocation] = useState(null)
  const [roomLanguage, setRoomLanguage] = useState(null)

  const [createFormError, setCreateFormError] = useState(false)
  const [micAccess, setMicAccess] = useState(false)

  const [province, setProvince] = useState(
    [
      { name: "Ariana", value: "ariana", id: 1 },
      { name: "Beja", value: "beja", id: 2 },
      { name: "Ben Arous", value: "benarous", id: 3 },
      { name: "Bizerte", value: "bizerte", id: 4 },
      { name: "Tataouine", value: "tataouine", id: 5 },
      { name: "Tozeur", value: "tozeur", id: 6 },
      { name: "Tunisia", value: "tunisia", id: 7 },
      { name: "Jendouba", value: "jendouba", id: 8 },
      { name: "Zaghouan", value: "zaghouan", id: 9 },
      { name: "Siliana", value: "siliana", id: 10 },
      { name: "Sousse", value: "sousse", id: 11 },
      { name: "Sidi Bouzid", value: "sidibouzid", id: 12 },
      { name: "Sfax", value: "sfax", id: 13 },
      { name: "Gabes", value: "gabes", id: 14 },
      { name: "Kebili", value: "kebili", id: 15 },
      { name: "Kasserine", value: "kasserine", id: 16 },
      { name: "Gafsa", value: "gafsa", id: 17 },
      { name: "Kairouan", value: "kairouan", id: 18 },
      { name: "El Kef", value: "elkef", id: 19 },
      { name: "Medenine", value: "medenine", id: 20 },
      { name: "Monastir", value: "monastir", id: 21 },
      { name: "Manouba", value: "manouba", id: 22 },
      { name: "Mahdia", value: "mahdia", id: 23 },
      { name: "Nabeul", value: "nabeul", id: 24 },
    ]
  )



  function requestMicAccess() {
    navigator.mediaDevices.getUserMedia({
      audio: true
    })
      .then(function (stream) {
        setMicAccess('granted')
      })
      .catch(function (err) {
        setMicAccess('denied')
      })
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUserName(user.displayName);
      }
    })

    navigator.permissions?.query(
      { name: 'microphone' }
    )
      .then(function (permissionStatus) {
        setMicAccess(permissionStatus.state)
      })
      .catch(() => { })


  }, [])



  function validForm() {



    if (!userName) {
      setCreateFormError('Please make sure that you are logged in first')
      return false
    }
    if (roomName.trim().length < 3) {
      setCreateFormError('Room Title must be longer than 3 characters')
      return false
    }

    if (!roomTopic) {
      setCreateFormError('Please make sure that you select Room Topic')
      return false
    }
    if (!roomLanguage) {
      setCreateFormError('Please make sure that you select Room Language')
      return false
    }
    if (!roomLocation) {
      setCreateFormError('Please make sure that you select Room Location')
      return false
    }

    setCreateFormError(false)
    return true
  }

  function createRoom() {
    if (!validForm()) return
    const roomId = uuid()
    dbCreateRoom(roomId, {
      roomId,
      roomName,
      userName,
      roomTopic,
      roomLanguage,
      roomLocation,
    })
    router.push({
      pathname: '/cast/[roomId]',
      as: `/cast/${roomId}`,
      query: {
        roomId,
        roomName,
        userName,
        roomTopic,
        roomLanguage,
        roomLocation,
      },
    }, `/cast/${roomId}`)
  }

  return (


    <Layout>

      <div className="create-room">
        <div className="spacing">
          <h1 className="brand-create-room">Join Our Digital Community 📢</h1>
          {/* <Heading size={2}>Host Room</Heading> */}
          {/* <div>
            <Input placeholder="Your Name" onChange={e => setUserName(e.target.value)} />
          </div> */}
          <div>

            <SelectInput onChange={e => setRoomTopic(e.target.value)} placeholder="Room Topic">
              <option selected disabled>Choose the room topic</option>
              <option value="Medical Transformation">Medical Transformation</option>
              <option value="Agriculture Transformation">Agriculture Transformation</option>
              <option value="Administration Transformation">Administration Transformation</option>
              <option value="Education Transformation">Education Transformation</option>
              <option value="Media Transformation">Media Transformation</option>

              <option value="other">Other</option>
            </SelectInput>


          </div>
          <div>
            <Input type='select' placeholder="Room Title" onChange={e => setRoomName(e.target.value)} />
          </div>
          <div>
            <SelectInput onChange={e => setRoomLanguage(e.target.value)} placeholder="Room Language">
              <option selected disabled>Choose the room language</option>
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
              <option value="French">French</option>
            </SelectInput>
          </div>
          <div>
            <SelectInput onChange={e => setRoomLocation(e.target.value)} placeholder="Room City">
              <option selected disabled>Choose the room location</option>
              {
                province.map(prov => (
                  <option
                    key={prov.id}
                    value={prov.name}
                    selected={province.id === prov.id}
                  >
                    {prov.name}
                  </option>
                ))
              }
            </SelectInput>
          </div>
        </div>
        {createFormError && (
          <div className="error">{createFormError}</div>
        )}
        <div style={{ marginTop: 20 }}>
          <Button success={micAccess === 'granted'} disabled={micAccess === 'granted'} fullWidth onClick={requestMicAccess}>Allow Microphone Access</Button>
        </div>
        <div style={{ marginTop: 20 }}>
          <Button outline={micAccess !== 'granted'} disabled={micAccess !== 'granted'} big fullWidth onClick={createRoom}>Create Room</Button>
        </div>

        <style jsx>{`
            .create-room {
              padding:20px;
              width:330px;
              margin:auto;
            }
           
          
            .brand-create-room{
            //  transform: rotate(2deg);
             text-align: center;
             font-size: 60;
            }
            .error {
              font-size: 12px;
              text-align: center;
              margin: 6px 0;
            }
          `}</style>
      </div>
    </Layout>

  )
}
