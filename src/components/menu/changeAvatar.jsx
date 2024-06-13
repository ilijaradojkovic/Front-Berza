import { Box } from "@mantine/core"
import { blackColor, darkGrayColor } from "../../colors/colors"

export const ChangeAvatar=({handleSelectedAvatar,close,images})=>{


   const  handleAvatarSelected=(index,image)=>{
        handleSelectedAvatar(index,image)
        close()
    }
        return (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                justifyContent: 'center',
                padding: '10px',
                backgroundColor:darkGrayColor
              }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50px',
                    height: '50px',
                    overflow: 'hidden',
                    borderRadius: '50%',
                  }}
                >
                  <img
                    src={image}
                    alt={`Image ${index}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%',
                    }}
                    onClick={()=>handleAvatarSelected(index,image)}
                  />
                </div>
              ))}
            </div>
          );
}