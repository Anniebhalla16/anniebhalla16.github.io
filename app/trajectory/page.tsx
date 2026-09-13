import { getTrajectoryEvents, getCategories } from '../../lib/db'
import TrajectoryClient from './TrajectoryClient'

export const revalidate = 3600

export default async function TrajectoryPage() {
  const [events, categories] = await Promise.all([getTrajectoryEvents(), getCategories()])
  return <TrajectoryClient events={events} categories={categories} />
}
