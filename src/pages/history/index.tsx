import { Flex, Heading, Text } from "@chakra-ui/layout";
import { format, getMonth, getYear, isAfter, parseISO } from "date-fns";
import { useMemo, useState } from "react";
import { Filter } from "@components/Filter";
import monthsList from "@utils/months";
import { ListItem } from "@components/ListItem";
import { useHistory } from "@hooks/useHistory";
import { Navbar } from "@components/Navbar";
import { Tabs } from "@components/Tabs";
import ptBR from "date-fns/esm/locale/pt-BR/index.js";
import { useAuth } from "@hooks/useAuth";

export default function History() {
  const { user } = useAuth();
  const { list } = useHistory();
  const [selectedMonth, setSelectedMonth] = useState<number>(
    getMonth(new Date()) + 1
  );
  const [selectedYear, setSelectedYear] = useState<number>(getYear(new Date()));
  const [locale, setLocale] = useState<Locale>();

  useMemo(async () => {
    if (!user?.language) {
      const locale: Locale = (await import(`date-fns/locale/en-US/index.js`))
        .default;
      setLocale(locale);
      return;
    }
    const locale: Locale = (
      await import(`date-fns/locale/${user.language}/index.js`)
    ).default;
    setLocale(locale);
  }, [user?.language]);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    list.forEach((item) => {
      const year = getYear(new Date(item.date));
      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, [list]);

  const months = useMemo(() => {
    return monthsList.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const dates = useMemo(() => {
    let uniqueDates: string[] = [];
    let dates: { date: string; dateFormatted: string }[] = [];

    list.forEach((item) => {
      const date = format(item.date, "P", { locale: locale });
      const formatedDate = new Date(item.date);
      const month = getMonth(formatedDate) + 1;
      const year = getYear(formatedDate);

      if (
        !uniqueDates.includes(date) &&
        month === selectedMonth &&
        year === selectedYear
      ) {
        uniqueDates.push(date);
        dates.push({
          date: date,
          dateFormatted: format(item.date, "PP", { locale: locale }),
        });
      }
    });

    const res = dates.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    });

    console.log(res);

    return res;
  }, [list, locale, selectedMonth, selectedYear]);

  return (
    <>
      <Navbar />
      <Flex
        py={"1rem"}
        direction="column"
        gridGap={"1rem"}
        minHeight={"calc(100vh - 8rem)"}
      >
        {/* Greeting & Balance */}
        <Flex direction="row" gridGap={"1rem"} justify={"flex-end"} px={"1rem"}>
          <Filter
            defaultValue={selectedMonth}
            options={months}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          />
          <Filter
            defaultValue={selectedYear}
            options={years}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          />
        </Flex>

        {dates.length === 0 && (
          <Flex
            grow={1}
            shrink={1}
            direction={"column"}
            align={"center"}
            justify={"center"}
            textColor={"gray.500"}
          >
            <Heading>Oops!</Heading>
            <Text>There are no records on this date.</Text>
          </Flex>
        )}

        {dates.length !== 0 &&
          dates.map((date) => {
            return (
              <Flex direction={"column"} key={date.date}>
                <Text
                  fontSize={"0.75rem"}
                  textTransform={"uppercase"}
                  fontFamily={"mono"}
                  mb={"0.5rem"}
                  mx={"1rem"}
                  textColor={"gray.500"}
                >
                  {date.dateFormatted}
                </Text>
                {list &&
                  list
                    .filter((item) => {
                      return (
                        format(item.date, "P", { locale: locale }) === date.date
                      );
                    })
                    .map((activity, index) => {
                      if (activity.listType === "Expense") {
                        return (
                          <ListItem
                            key={activity.id}
                            type={activity?.listType}
                            title={activity?.title}
                            account={activity?.account}
                            date={activity?.date}
                            value={activity.value}
                            category={activity?.category}
                            layout={"default"}
                            coming={isAfter(activity.date, new Date())}
                          />
                        );
                      }
                      if (activity.listType === "Income") {
                        return (
                          <ListItem
                            key={activity.id}
                            type={activity?.listType}
                            title={activity?.title}
                            account={activity?.account}
                            date={activity?.date}
                            value={activity.value}
                            layout={"default"}
                            coming={isAfter(activity.date, new Date())}
                          />
                        );
                      }
                      if (activity.listType === "Transfer") {
                        return (
                          <ListItem
                            key={activity.id}
                            type={activity?.listType}
                            date={activity?.date}
                            value={activity.value}
                            layout={"default"}
                            coming={isAfter(activity.date, new Date())}
                            destination={activity.destination}
                            origin={activity.origin}
                          />
                        );
                      }
                    })}
              </Flex>
            );
          })}
      </Flex>
      <Tabs />
    </>
  );
}
