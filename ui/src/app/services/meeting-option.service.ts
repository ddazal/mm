import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MeetingOption } from '../meeting-wizard/models/meeting-option.model';

@Injectable({
  providedIn: 'root'
})
export class MeetingOptionService {
  endpoint = 'http://localhost:3000/options';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  async addVotes(ids: string[], voter: string): Promise<void> {
    for (const id of ids) {
      const url = `${this.endpoint}/${id}`
      const option = await this.http.get<MeetingOption>(url).toPromise()
      const votes = option.votes
      const voters = option.voters

      voters.push(voter)

      const body = {
        votes: votes + 1,
        voters
      }
      await this.http.patch<MeetingOption>(url, body, { headers: this.headers }).toPromise()
    }
  }
}
