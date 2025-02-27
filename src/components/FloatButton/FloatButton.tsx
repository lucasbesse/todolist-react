import { WhatsApp } from "@mui/icons-material"
import { Fab, Tooltip } from "@mui/material"
import "./FloatButton.css"

function FloatButton(props){
  return(
  <Tooltip className="custom-tooltip" classes={{ popper: "custom-tooltip finish" }} title={props.active ? 'Ativo' : 'Inativo'}>
      <Fab onClick={props.toggleActive} className={`float-btn ${!props.active && 'inactive'}`} color="primary" aria-label="add">
        <WhatsApp />
      </Fab>
  </Tooltip>
  )
}

export default FloatButton