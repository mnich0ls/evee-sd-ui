 <template>
    <a :href="event.url" target="_blank">
        <v-card height="100%">
            <v-img
            :src="event.thumbnailImage"
            aspect-ratio="2.75"
            ></v-img>
            <v-card-title primary-title>
            <div>
                <div class="headline font-weight-bold">{{event.title}}</div>
                <div class="mb-2">{{event['sub-heading']}}</div>
                <div>
                    <strong>{{event.original_dates}}</strong> - {{event.tag}} 
                </div>
                <div>  
                    <v-chip>
                        {{
                            event.price.length > 10 ? event.price.substring(0,30) + ' ...': 
                            event.price === "" ? "N/A" : event.price
                        }}
                    </v-chip>
                </div>
                <v-icon color="green" class="fas fa-map-marker-alt fa-1x mt-2 mr-2"></v-icon>
                <h4 style="display:inline">{{event.region}}</h4>
            </div>
            </v-card-title>
        </v-card>
    </a>    
</template>

<script>
export default {
  name: 'EventCard',
  props: {
      event
  }
}
</script>

<style>
    a {
        text-decoration: none;
    }
</style>
