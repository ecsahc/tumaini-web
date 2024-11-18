import EdgeFormService from '#services/edge_form_service'
import edge from 'edge.js'
import { edgeIconify, addCollection } from 'edge-iconify'
import { icons as phicons } from '@iconify-json/ph'
import { icons as svgspinners } from '@iconify-json/svg-spinners'

addCollection(phicons)
addCollection(svgspinners)

edge.use(edgeIconify)

edge.global('form', EdgeFormService)